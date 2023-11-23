// src/services/authService.ts
import * as userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../middleware/authMiddleware';
import { User } from '../models/userModel';

const generateToken = (userId: number, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

interface AuthenticateUser {
  user: User;
  token: string;
}

export const authenticateUser = async (email: string, password: string): Promise<AuthenticateUser | null> => {
  const user = await userModel.findByEmail(email);
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  return { user, token: generateToken(user.userID, user.email) };
};
