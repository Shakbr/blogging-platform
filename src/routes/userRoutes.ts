import { loginValidation, userCreationValidation } from './../validations/validations';
import express from 'express';
import { fetchTopCommenters, registerUser, loginUser } from '../controllers/userController';
import { auth } from '@/middleware/authMiddleware';
import { validationErrorHandler } from '@/middleware/validationErrorHandler';

const router = express.Router();

// Public routes
router.post('/login', loginValidation, validationErrorHandler, loginUser);
router.post('/register', userCreationValidation, validationErrorHandler, registerUser);

// Grouping authenticated routes
router.use(auth);
router.get('/top-commenters', fetchTopCommenters);

export default router;
