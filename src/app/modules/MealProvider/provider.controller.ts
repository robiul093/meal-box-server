import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { providerService } from './provider.service';
import httpStatus from 'http-status';

const createMeal = catchAsync(async (req, res) => {
  const result = await providerService.createMealIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meal created successfully',
    data: result,
  });
});

const getProviderMeals = catchAsync(async (req, res) => {
  const providerId = req.user.userId;

  const result = await providerService.getProviderMealFromDb(providerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meal retrives successfully',
    data: result,
  });
});

const getSingleMeal = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await providerService.getSingleMealFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meal retrive successfully',
    data: result,
  });
});

const updateMeal = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = providerService.updateSingleMealIntoDb(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update meal successfully',
    data: result,
  });
});

const getOrder = catchAsync(async (req, res) => {
  const result = await providerService.getOrderFromDb(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrived successfully',
    data: result,
  });
});

const responseOrder = catchAsync(async (req, res) => {
  const result = await providerService.responseOrderToCustomer(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Set order response successfully',
    data: result,
  });
});

export const providerController = {
  createMeal,
  getProviderMeals,
  getSingleMeal,
  updateMeal,
  getOrder,
  responseOrder,
};
