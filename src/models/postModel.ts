import pool from '../config/dbConfig';
import { RowDataPacket } from 'mysql2';
import { Comment } from './commentModel';

export interface Post {
  postId?: number;
  title: string;
  content: string;
  userId: number;
  timestamp?: Date;
}

export interface PostWithComments extends Post {
  comments: Omit<Comment, 'postId'>[];
}

export const createPost = async (post: Post): Promise<void> => {
  const query = 'INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)';
  await pool.execute(query, [post.title, post.content, post.userId]);
};

export const getAllPosts = async (): Promise<RowDataPacket[]> => {
  const query = 'SELECT * FROM posts';
  const [posts] = await pool.execute<RowDataPacket[]>(query);
  return posts;
};

export const getPostsByUser = async (userId: number): Promise<RowDataPacket[]> => {
  const query = `
    SELECT
      posts.*,
      COALESCE(likeData.likeCount, 0) AS likeCount
    FROM
      posts
    LEFT JOIN
      (SELECT
         postId,
         COUNT(*) AS likeCount
       FROM
         postLikes
       GROUP BY
         postId
      ) AS likeData ON posts.postId = likeData.postId
    WHERE
      posts.userId = ?
  `;
  const [posts] = await pool.execute<RowDataPacket[]>(query, [userId]);
  return posts;
};

export const getAllPostsWithComments = async (): Promise<PostWithComments[]> => {
  const query = `
    SELECT
      posts.postId,
      posts.title,
      posts.content,
      posts.userId,
      posts.timestamp,
      comments.commentId,
      comments.content AS commentContent,
      comments.userId AS commentUserId,
      comments.timestamp AS commentTimestamp
    FROM
      posts
    LEFT JOIN
      comments ON posts.postId = comments.postId
    ORDER BY
      posts.timestamp DESC, comments.timestamp ASC
  `;

  const [rows] = await pool.execute<RowDataPacket[]>(query);
  const posts: { [postId: number]: PostWithComments } = {};

  rows.forEach((row) => {
    if (!posts[row.postId]) {
      posts[row.postId] = {
        postId: row.postId,
        title: row.title,
        content: row.content,
        userId: row.userId,
        timestamp: row.timestamp,
        comments: [],
      };
    }

    if (row.commentId) {
      const comment: Omit<Comment, 'postId'> = {
        commentId: row.commentId,
        content: row.commentContent,
        userId: row.commentUserId,
        timestamp: row.commentTimestamp,
      };
      posts[row.postId].comments.push(comment);
    }
  });
  return Object.values(posts);
};

export const postExistsByID = async (postId: number): Promise<boolean> => {
  const query = 'SELECT 1 FROM posts WHERE postId = ?';
  const [rows] = await pool.execute<RowDataPacket[]>(query, [postId]);
  return rows.length > 0;
};

export const addLike = async (postId: number, userId: number): Promise<void> => {
  const query = 'INSERT INTO postLikes (postId, userId) VALUES (?, ?)';
  await pool.execute(query, [postId, userId]);
};

export const countLikes = async (postId: number): Promise<number> => {
  const query = 'SELECT COUNT(*) AS likeCount FROM postLikes WHERE postId = ?';
  const [rows] = await pool.execute<RowDataPacket[]>(query, [postId]);
  return rows[0].likeCount;
};
