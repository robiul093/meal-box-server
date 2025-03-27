import { Router } from 'express';
import { customerController } from './customer.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/customers/order',
  auth('customer'),
  customerController.createOrder,
);
router.get(
  '/customers/orders',
  auth('customer'),
  customerController.getAllOrder,
);
router.get('/customers/meal', customerController.getAllMeal);

export const CustomerRouter = router;
