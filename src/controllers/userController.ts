import { Request, Response } from 'express';
import * as userModel from '../models/userModel';
import { validationResult } from 'express-validator';

export const fetchTopCommenters = async (req: Request, res: Response): Promise<void> => {
  try {
    const topCommenters = await userModel.getTopCommenters();
    res.json(topCommenters);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    if (await userModel.userExists(email)) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    await userModel.createUser({ username, email, password });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};
