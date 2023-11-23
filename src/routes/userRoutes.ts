import { userCreationValidation } from './../validations/validations';
import express from 'express';
import { fetchTopCommenters, createUser } from '../controllers/userController';

const router = express.Router();

router.get('/top-commenters', fetchTopCommenters);

router.post('/', userCreationValidation, createUser);

export default router;
