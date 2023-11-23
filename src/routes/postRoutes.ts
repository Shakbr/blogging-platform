import express from 'express';
import * as postController from '../controllers/postController';
import { fetchPostsByUserValidation, postCreationValidation } from '@/validations/validations';
import { auth } from '@/middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', postController.fetchAllPostsWithComments);

// Grouping authenticated routes
router.use(auth);
router.post('/', postCreationValidation, postController.createPost);
router.get('/user/:userId', fetchPostsByUserValidation, postController.fetchPostsByUser);

export default router;
