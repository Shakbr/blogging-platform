// src/models/userModel.ts
import { RowDataPacket } from 'mysql2';
import pool from '../config/dbConfig';
import { TopCommenter } from '../types/types';
import bcrypt from 'bcrypt';

export interface User {
  userID?: number;
  username: string;
  email: string;
  password: string;
}

type ValidParams = string | number;

export const createUser = async (user: User): Promise<void> => {
  const { username, email, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)';
  await pool.execute(query, [username, email, hashedPassword]);
};

const checkUserExists = async (condition: string, params: ValidParams[]): Promise<boolean> => {
  const query = `SELECT * FROM Users WHERE ${condition}`;
  const [rows] = await pool.execute<RowDataPacket[]>(query, params);
  return rows.length > 0;
};

export const userExists = async (email: string): Promise<boolean> => {
  return checkUserExists('Email = ?', [email]);
};

export const userExistsByID = async (userID: number): Promise<boolean> => {
  return checkUserExists('UserID = ?', [userID]);
};

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
