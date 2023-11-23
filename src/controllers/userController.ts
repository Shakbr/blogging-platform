import { Request, Response } from 'express';
import { getTopCommenters } from '../models/userModel';

export const fetchTopCommenters = async (req: Request, res: Response): Promise<void> => {
  try {
    const topCommenters = await getTopCommenters();
    res.json(topCommenters);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
