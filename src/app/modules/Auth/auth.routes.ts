import { Router } from 'express';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/create-user', authController.createUser);
router.post('/login', authController.loginUser);
router.patch('/user/update-name',auth('customer', 'provider'), authController.updateUserName);

export const AuthRouter = router;
