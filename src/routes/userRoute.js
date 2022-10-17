import express from 'express';
import { getUsers, getRanking} from '../controllers/userController.js';

const router = express.Router();

router.get('/users/me', getUsers);
router.get('/ranking', getRanking);

export default router;