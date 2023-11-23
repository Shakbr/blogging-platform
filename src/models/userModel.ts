// src/models/userModel.ts
import { RowDataPacket } from 'mysql2';
import pool from '../config/dbConfig';
import { TopCommenter } from '../types/types';

export interface User {
  userID: number;
  username: string;
  email: string;
  password: string;
}

export const getTopCommenters = async (): Promise<TopCommenter[]> => {
  const query = `
        SELECT
            Users.Username,
            COUNT(Comments.CommentID) AS CommentCount
        FROM
            Users
        JOIN
            Comments ON Users.UserID = Comments.UserID
        GROUP BY
            Users.UserID
        ORDER BY
            CommentCount DESC
        LIMIT 5;
    `;

  try {
    const [results] = await pool.query<RowDataPacket[]>(query);
    return results as TopCommenter[];
  } catch (error) {
    console.error('Error in userModel - getTopCommenters:', error);
    throw error;
  }
};
