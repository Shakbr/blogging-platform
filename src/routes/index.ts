import express from 'express';
import userRoutes from './userRoutes';
import postRoutes from './postRoutes';
import commentRoutes from './commentRoutes';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

export default router;
