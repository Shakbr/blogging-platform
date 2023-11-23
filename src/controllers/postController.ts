import { Request, Response } from 'express';
import * as postModel from '../models/postModel';
import { validationResult } from 'express-validator';
import { AuthRequest } from '@/types/types';

export const createPost = async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content } = req.body;

    const userId = req.user?.userId as number;

    await postModel.createPost({ title, content, userId });

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

export const fetchAllPostsWithComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await postModel.getAllPostsWithComments();
    const posts = {};

    results.forEach((row) => {
      if (!posts[row.postId]) {
        posts[row.postId] = {
          postId: row.postId,
          title: row.title,
          content: row.content,
          userId: row.userId,
          timestamp: row.timestamp,
          comments: [],
        };
      }
      if (row.commentId) {
        posts[row.postId].comments.push({
          commentId: row.commentId,
          content: row.commentContent,
          userId: row.commentUserId,
          timestamp: row.commentTimestamp,
        });
      }
    });

    res.json(Object.values(posts));
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const fetchPostsByUser = async (req: AuthRequest, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const userId = req.user?.userId as number;
  try {
    const userPosts = await postModel.getPostsByUser(userId);
    res.json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
