import pool from '../config/dbConfig';
import { RowDataPacket } from 'mysql2';

export interface Comment {
  commentId?: number;
  content: string;
  userId: number;
  postId: number;
  timestamp?: Date;
}

export const createComment = async (newComment: Comment): Promise<void> => {
  const { content, userId, postId } = newComment;
  const query = 'INSERT INTO comments (content, userId, postId) VALUES (?, ?, ?)';
  await pool.execute(query, [content, userId, postId]);
};

export const getCommentsByPost = async (postId: number): Promise<Comment[]> => {
  const query = 'SELECT * FROM comments WHERE postId = ?';
  const [comments] = await pool.execute<RowDataPacket[]>(query, [postId]);
  return comments as Comment[];
};
