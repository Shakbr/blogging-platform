import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

export const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET as Secret;

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};
