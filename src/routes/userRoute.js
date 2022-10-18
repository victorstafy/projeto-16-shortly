import express from 'express';
import * as controllers from '../controllers/userController.js';
import * as middlewares from '../middlewares/userMiddleware.js';

const router = express.Router();

router.get('/users/me', middlewares.getUsers, controllers.getUsers);
router.get('/ranking', controllers.getRanking);

export default router;