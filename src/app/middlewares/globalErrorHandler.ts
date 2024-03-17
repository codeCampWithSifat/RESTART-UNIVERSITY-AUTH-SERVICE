/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler From Global ~~`, error)
    : console.log(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Something Went Wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simpliFiedError = handleValidationError(error);
    statusCode = simpliFiedError.statusCode;
    message = simpliFiedError.message;
    errorMessages = simpliFiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simpliFiedError = handleZodError(error);
    statusCode = simpliFiedError.statusCode;
    message = simpliFiedError.message;
    errorMessages = simpliFiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simpliFiedError = handleCastError(error);
    message = simpliFiedError.message;
    errorMessages = simpliFiedError.errorMessages;
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
