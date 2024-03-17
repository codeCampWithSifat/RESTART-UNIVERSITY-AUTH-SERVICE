import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  console.log(error);
  const errors: IGenericErrorMessage[] = [
    {
      path: error?.path,
      message: 'Invalid ObjectId Get From Mongoose',
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast Error Occured',
    errorMessages: errors,
  };
};

export default handleCastError;
