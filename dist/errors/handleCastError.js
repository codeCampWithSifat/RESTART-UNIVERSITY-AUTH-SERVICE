'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const handleCastError = error => {
  console.log(error);
  const errors = [
    {
      path: error === null || error === void 0 ? void 0 : error.path,
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
exports.default = handleCastError;
