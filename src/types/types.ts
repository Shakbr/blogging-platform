import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
export interface TopCommenter {
  username: string;
  commentCount: number;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
