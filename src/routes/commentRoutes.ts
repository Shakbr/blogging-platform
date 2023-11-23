import express from 'express';
import * as commentController from '../controllers/commentController';
import { commentCreationValidation } from '@/validations/validations';

const router = express.Router();

router.post('/', commentCreationValidation, commentController.createComment);

export default router;
