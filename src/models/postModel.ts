import pool from '../config/dbConfig';
import { RowDataPacket } from 'mysql2';

export interface Post {
  postId?: number;
  title: string;
  content: string;
  userId: number;
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
  const query = 'SELECT * FROM posts WHERE userId = ?';
  const [posts] = await pool.execute<RowDataPacket[]>(query, [userId]);
  return posts;
};

export const getAllPostsWithComments = async (): Promise<RowDataPacket[]> => {
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

  const [results] = await pool.execute<RowDataPacket[]>(query);
  return results;
};

export const postExistsByID = async (postId: number): Promise<boolean> => {
  const query = 'SELECT 1 FROM posts WHERE postId = ?';
  const [rows] = await pool.execute<RowDataPacket[]>(query, [postId]);
  return rows.length > 0;
};
