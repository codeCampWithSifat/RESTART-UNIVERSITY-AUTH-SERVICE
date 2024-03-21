import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body)
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendReponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login Succesfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendReponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Refresh Token Get  Succesfully',
    data: result,
  });
});
export const AuthController = {
  loginUser,
  refreshToken,
};
