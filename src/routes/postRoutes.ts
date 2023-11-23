import express from 'express';
import * as postController from '../controllers/postController';
import { postCreationValidation } from '@/validations/userValidations';

const router = express.Router();

router.post('/', postCreationValidation, postController.createPost);

export default router;
