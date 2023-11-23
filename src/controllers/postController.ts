import { Post } from './../models/postModel';
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

    const newPost: Post = { title, content, userId };

    await postModel.createPost(newPost);

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

export const fetchAllPostsWithComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const postsWithComment = await postModel.getAllPostsWithComments();

    res.json(postsWithComment);
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
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  try {
    const userPosts = await postModel.getPostsByUser(userId);
    res.json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const likePost = async (req: AuthRequest, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    const userId = req.user!.userId;

    await postModel.addLike(postId, userId);
    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error liking post');
  }
};
