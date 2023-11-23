import express from 'express';
import * as postController from '../controllers/postController';
import { fetchPostsByUserValidation, likePostValidation, postCreationValidation } from '@/validations/validations';
import { auth } from '../middleware/authMiddleware';
import { validationErrorHandler } from './../middleware/validationErrorHandler';

const router = express.Router();

// Public routes
router.get('/', postController.fetchAllPostsWithComments);

// Grouping authenticated routes
router.use(auth);

router.post('/', postCreationValidation, validationErrorHandler, postController.createPost);
router.get('/user/:userId', fetchPostsByUserValidation, validationErrorHandler, postController.fetchPostsByUser);
router.post('/like/:postId', likePostValidation, validationErrorHandler, postController.likePost);

export default router;
