import { Request, Response } from 'express';
import * as postModel from '../models/postModel';
import * as userModel from '../models/userModel';
import { validationResult } from 'express-validator';

export const createPost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, userID } = req.body;

    const userExists = await userModel.userExistsByID(userID);
    if (!userExists) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await postModel.createPost({ title, content, userID });

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};
