import express from 'express';
import * as postController from '../controllers/postController';
import { fetchPostsByUserValidation, postCreationValidation } from '@/validations/validations';

const router = express.Router();

router.post('/', postCreationValidation, postController.createPost);

router.get('/', postController.fetchAllPostsWithComments);

router.get('/user/:userId', fetchPostsByUserValidation, postController.fetchPostsByUser);

export default router;
