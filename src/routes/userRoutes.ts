import express from 'express';
import { fetchTopCommenters } from '../controllers/userController';

const router = express.Router();

router.get('/top-commenters', fetchTopCommenters);

export default router;
