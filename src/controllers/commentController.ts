// src/controllers/commentController.ts
import { Request, Response } from 'express';
import * as commentModel from '../models/commentModel';
import { validationResult } from 'express-validator';
import * as userModel from '../models/userModel';
import * as postModel from '../models/postModel';

export const createComment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content, userID, postID } = req.body;

  try {
    const userExists = await userModel.userExistsByID(userID);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const postExists = await postModel.postExistsByID(postID);
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await commentModel.createComment(content, userID, postID);
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};
