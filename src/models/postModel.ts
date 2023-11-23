import pool from '../config/dbConfig';
import { RowDataPacket } from 'mysql2';

export interface Post {
  postID?: number;
  title: string;
  content: string;
  userID: number;
}

export const createPost = async (post: Post): Promise<void> => {
  const query = 'INSERT INTO Posts (Title, Content, UserID) VALUES (?, ?, ?)';
  await pool.execute(query, [post.title, post.content, post.userID]);
};

export const getAllPosts = async (): Promise<RowDataPacket[]> => {
  const query = 'SELECT * FROM Posts';
  const [posts] = await pool.execute<RowDataPacket[]>(query);
  return posts;
};

export const getPostsByUser = async (userId: number): Promise<RowDataPacket[]> => {
  const query = 'SELECT * FROM Posts WHERE UserID = ?';
  const [posts] = await pool.execute<RowDataPacket[]>(query, [userId]);
  return posts;
};

export const getAllPostsWithComments = async (): Promise<RowDataPacket[]> => {
  const query = `
    SELECT
      Posts.PostID,
      Posts.Title,
      Posts.Content,
      Posts.UserID,
      Posts.Timestamp,
      Comments.CommentID,
      Comments.Content AS CommentContent,
      Comments.UserID AS CommentUserID,
      Comments.Timestamp AS CommentTimestamp
    FROM
      Posts
    LEFT JOIN
      Comments ON Posts.PostID = Comments.PostID
    ORDER BY
      Posts.Timestamp DESC, Comments.Timestamp ASC
  `;

  const [results] = await pool.execute<RowDataPacket[]>(query);
  return results;
};

export const postExistsByID = async (postId: number): Promise<boolean> => {
  const query = 'SELECT 1 FROM Posts WHERE PostID = ?';
  const [rows] = await pool.execute<RowDataPacket[]>(query, [postId]);
  return rows.length > 0;
};
