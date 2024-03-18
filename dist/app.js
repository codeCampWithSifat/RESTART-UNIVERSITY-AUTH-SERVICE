"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
// import ApiError from './errors/ApiError';
const app = (0, express_1.default)();
// use all the middlewar
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// use all the application router
app.use('/api/v1', routes_1.default);
// Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//     throw new ApiError(400, 'Onk Boro Error');
//   // next('Ora Baba Eato Boro Error');
//   //   Promise.reject(new Error('Unhandled Promise Rejection'));
// });
// Global Error Handing
app.use(globalErrorHandler_1.default);
// Not Found Api
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
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
exports.default = app;
