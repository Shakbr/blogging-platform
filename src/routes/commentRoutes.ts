import express from 'express';
import * as commentController from '../controllers/commentController';
import { commentCreationValidation } from '@/validations/validations';
import { auth } from '@/middleware/authMiddleware';
import { validationErrorHandler } from '@/middleware/validationErrorHandler';

const router = express.Router();

// Grouping authenticated routes
router.use(auth);
router.post('/', commentCreationValidation, validationErrorHandler, commentController.createComment);

export default router;
