// src/validations/userValidations.ts
import { body } from 'express-validator';

export const userCreationValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const postCreationValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('userID').isNumeric().withMessage('Valid UserID is required'),
];
