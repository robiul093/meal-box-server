import { Router } from 'express';
import { providerController } from './provider.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/providers/menu', auth('provider'), providerController.createMeal);
router.get(
  '/providers/menu',
  auth('provider'),
  providerController.getProviderMeals,
);
router.get(
  '/providers/menu/:id',
  auth('provider'),
  providerController.getSingleMeal,
);
router.patch(
  '/providers/menu/:id',
  auth('provider'),
  providerController.updateMeal,
);
router.get('/providers/orders', auth('provider'), providerController.getOrder);
router.patch(
  '/providers/response',
  auth('provider'),
  providerController.responseOrder,
);

export const ProviderRouter = router;
