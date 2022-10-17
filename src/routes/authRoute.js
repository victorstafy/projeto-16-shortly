import express from 'express';
import * as controllers from '../controllers/authController.js';
import * as middlewares from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', middlewares.signUp, controllers.signUp);
router.post('/signin', middlewares.signIn, controllers.signIn);

export default router;