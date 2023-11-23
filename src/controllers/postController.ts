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

export const fetchAllPostsWithComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await postModel.getAllPostsWithComments();
    const posts = {};

    results.forEach((row) => {
      if (!posts[row.PostID]) {
        posts[row.PostID] = {
          PostID: row.PostID,
          Title: row.Title,
          Content: row.Content,
          UserID: row.UserID,
          Timestamp: row.Timestamp,
          Comments: [],
        };
      }
      if (row.CommentID) {
        posts[row.PostID].Comments.push({
          CommentID: row.CommentID,
          Content: row.CommentContent,
          UserID: row.CommentUserID,
          Timestamp: row.CommentTimestamp,
        });
      }
    });

    res.json(Object.values(posts));
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const fetchPostsByUser = async (req: Request, res: Response) => {
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
