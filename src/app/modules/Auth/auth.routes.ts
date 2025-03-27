import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

router.post('/create-user', authController.createUser);
router.post('/login', authController.loginUser);

export const AuthRouter = router;
