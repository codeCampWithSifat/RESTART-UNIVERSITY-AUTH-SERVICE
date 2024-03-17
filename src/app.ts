import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
// import ApiError from './errors/ApiError';
const app: Application = express();

// use all the middlewar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use all the application router
app.use('/api/v1', routes);

// Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//     throw new ApiError(400, 'Onk Boro Error');
//   // next('Ora Baba Eato Boro Error');
//   //   Promise.reject(new Error('Unhandled Promise Rejection'));
// });

// Global Error Handing
app.use(globalErrorHandler);

// Not Found Api
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Something Went Wrong....Coming Soon Later',
      },
    ],
  });
  next();
});

export default app;
