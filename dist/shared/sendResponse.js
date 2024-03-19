'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const sendReponse = (res, data) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};
exports.default = sendReponse;
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
