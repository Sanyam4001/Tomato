
import express from 'express';
import { signup,login } from '../controllers/authControllers.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login',login);

export default router; 