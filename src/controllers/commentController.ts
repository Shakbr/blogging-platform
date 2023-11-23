// src/controllers/commentController.ts
import { Response } from 'express';
import * as commentModel from '../models/commentModel';
import { validationResult } from 'express-validator';
import * as postModel from '../models/postModel';
import { AuthRequest } from '@/types/types';

export const createComment = async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content, postId } = req.body;

  try {
    const userId = req.user?.userId as number;

    const postExists = await postModel.postExistsByID(postId);
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await commentModel.createComment(content, userId, postId);
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};
