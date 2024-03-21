import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body)
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login Succesfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
