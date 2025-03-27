import { JwtPayload } from 'jsonwebtoken';
import { Order } from '../Customer/customer.model';
import { TMeal } from './provider.interface';
import { Meal } from './provider.model';

const createMealIntoDb = async (payload: TMeal) => {
  const result = await Meal.create(payload);

  return result;
};

const getProviderMealFromDb = async (payload: string) => {
  const result = await Meal.find({ provider: payload });

  return result;
};

const getSingleMealFromDb = async (id: string) => {
  const result = await Meal.findById({ _id: id });

  return result;
};

const updateSingleMealIntoDb = async (id: string, payload: TMeal) => {
  const result = await Meal.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const getOrderFromDb = async (user: JwtPayload) => {
  const result = await Order.find({ provider: user.userId })
    .populate('customer', 'name email role')
    .populate('provider', 'name email')
    .populate({
      path: 'mealSelection.mealId',
      // select: "name price ingredients",
    });

  return result;
};

const responseOrderToCustomer = async (payload: {
  orderId: string;
  status: string;
}) => {
  const updatedData = {
    status: payload.status,
  };

  const result = await Order.findByIdAndUpdate(
    { _id: payload.orderId },
    updatedData,
    { new: true },
  );

  return result;
};

export const providerService = {
  createMealIntoDb,
  getProviderMealFromDb,
  getSingleMealFromDb,
  updateSingleMealIntoDb,
  getOrderFromDb,
  responseOrderToCustomer,
};
