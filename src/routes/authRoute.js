import express from 'express';
import { signUp, signIn, user_id } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;