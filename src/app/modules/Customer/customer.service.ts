import { Meal } from '../MealProvider/provider.model';
import { TOrder } from './customer.interface';
import { Order } from './customer.model';

const createOrderIntoDb = async (payload: TOrder) => {
  const result = await Order.create(payload);

  return result;
};

const getAllOrderFromDb = async () => {
  const result = await Order.find()
    .populate('customer', 'name email role')
    .populate('provider', 'name email')
    .populate({
      path: 'mealSelection.mealId',
      // select: "name price ingredients",
    });

  return result;
};

const getAllMealFromDb = async () => {
  const result = await Meal.find();

  return result;
};

export const customerService = {
  createOrderIntoDb,
  getAllOrderFromDb,
  getAllMealFromDb,
};
