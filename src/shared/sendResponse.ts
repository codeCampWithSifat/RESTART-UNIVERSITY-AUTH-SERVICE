import { Response } from 'express';

type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const sendReponse = <T>(res: Response, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendReponse;

// const sendResponse = <T>(
//   res: Response,
//   data: {
//     statusCode: number;
//     success: boolean;
//     message?: string | null;
//     data: T;
//   },
// ): void => {
//   res.status(data.statusCode).json({
//     statusCode: data.statusCode,
//     success: data.success,
//     message: data.message || null,
//     data: data.data || null,
//   });
// };

// export default sendResponse;
