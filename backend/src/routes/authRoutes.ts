import { Router } from 'express';
import { signup, login } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);  // /api/auth/signup
router.post('/login', login);    // /api/auth/login

export default router;
