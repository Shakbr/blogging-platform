import express from 'express';
import * as commentController from '../controllers/commentController';
import { commentCreationValidation } from '@/validations/validations';
import { auth } from '@/middleware/authMiddleware';

const router = express.Router();

// Grouping authenticated routes
router.use(auth);
router.post('/', commentCreationValidation, commentController.createComment);

export default router;
