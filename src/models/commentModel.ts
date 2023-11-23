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
  const query = 'INSERT INTO Comments (Content, UserID, PostID) VALUES (?, ?, ?)';
  await pool.execute(query, [content, userId, postId]);
};

export const getCommentsByPost = async (postId: number): Promise<RowDataPacket[]> => {
  const query = 'SELECT * FROM Comments WHERE PostID = ?';
  const [comments] = await pool.execute<RowDataPacket[]>(query, [postId]);
  return comments;
};
