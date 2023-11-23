import pool from '../config/dbConfig';
import { RowDataPacket } from 'mysql2';

export interface Comment {
  commentID?: number;
  content: string;
  userID: number;
  postID: number;
  timestamp: Date;
}

export const createComment = async (content: string, userId: number, postId: number): Promise<void> => {
  const query = 'INSERT INTO comments (content, userID, postID) VALUES (?, ?, ?)';
  await pool.execute(query, [content, userId, postId]);
};

export const getCommentsByPost = async (postId: number): Promise<RowDataPacket[]> => {
  const query = 'SELECT * FROM comments WHERE postID = ?';
  const [comments] = await pool.execute<RowDataPacket[]>(query, [postId]);
  return comments;
};
