import { body, param } from 'express-validator';

export const userCreationValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const postCreationValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
];

export const commentCreationValidation = [
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('postId').isNumeric().withMessage('Valid PostID is required'),
  body('timestamp').isISO8601().withMessage('Valid timestamp is required'),
];

export const fetchPostsByUserValidation = [param('userId').isNumeric().withMessage('Valid UserID is required')];

export const likePostValidation = [param('postId').isNumeric().withMessage('Valid PostID is required')];
