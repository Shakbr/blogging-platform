import { Response } from 'express';
import * as commentModel from '../models/commentModel';
import * as postModel from '../models/postModel';
import { AuthRequest } from '@/types/types';
import { Comment } from '../models/commentModel';

export const createComment = async (req: AuthRequest, res: Response) => {
  const { content, postId } = req.body;

  try {
    const userId = req.user!.userId as number;

    const postExists = await postModel.postExistsByID(postId);
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment: Comment = { content, userId, postId };

    await commentModel.createComment(newComment);
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};
