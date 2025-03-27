import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { customerService } from './customer.service';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req, res) => {
  const result = await customerService.createOrderIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await customerService.getAllOrderFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllMeal = catchAsync(async (req, res) => {
  const result = await customerService.getAllMealFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '',
    data: result,
  });
});

export const customerController = {
  createOrder,
  getAllOrder,
  getAllMeal,
};
