import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
    const result = await authService.createUserIntoDb(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User is created successfully',
        data: result
    });
});


const loginUser = catchAsync(async (req, res) => {
    const result = await authService.userLoginIntoDb(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successfully',
        data: result
    })
})



export const authController = {
    createUser,
    loginUser,
}