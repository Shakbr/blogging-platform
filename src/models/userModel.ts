import { RowDataPacket } from 'mysql2';
import pool from '../config/dbConfig';
import { TopCommenter } from '../types/types';
import bcrypt from 'bcrypt';

export interface User {
  userId?: number;
  username: string;
  email: string;
  password: string;
}

type ValidParams = string | number;

export const createUser = async (user: User): Promise<void> => {
  const { username, email, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  await pool.execute(query, [username, email, hashedPassword]);
};

const checkUserExists = async (condition: string, params: ValidParams[]): Promise<boolean> => {
  const query = `SELECT * FROM users WHERE ${condition}`;
  const [rows] = await pool.execute<RowDataPacket[]>(query, params);
  return rows.length > 0;
};

export const findByEmail = async (email: string): Promise<User | null> => {
  const exists = await userExists(email);
  if (!exists) {
    return null;
  }

  const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
  const [rows] = await pool.execute<RowDataPacket[]>(query, [email]);
  return rows[0] as User;
};

export const userExists = async (email: string): Promise<boolean> => {
  return checkUserExists('email = ?', [email]);
};

export const userExistsByID = async (userID: number): Promise<boolean> => {
  return checkUserExists('userId = ?', [userID]);
};

export const getTopCommenters = async (): Promise<TopCommenter[]> => {
  const query = `
        SELECT
            users.username,
            COUNT(comments.commentId) AS commentCount
        FROM
            users
        JOIN
            comments ON users.userId = comments.userId
        GROUP BY
            users.UserId
        ORDER BY
            commentCount DESC
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
