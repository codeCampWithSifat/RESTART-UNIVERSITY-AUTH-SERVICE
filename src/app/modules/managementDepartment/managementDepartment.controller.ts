import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ManagementDepartmentService } from './managementDepartment.service';
import sendReponse from '../../../shared/sendResponse';
import { IManagementDepartment } from './managementDepartment.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { managementDepartmentFilterableFields } from './managementDepartment.constants';
import { paginationFields } from '../../../constants/pagination';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result =
    await ManagementDepartmentService.createDepartment(departmentData);

  sendReponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department created successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, managementDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ManagementDepartmentService.getAllDepartments(
    filters,
    paginationOptions,
  );

  sendReponse<IManagementDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management departments retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDepartmentService.getSingleDepartment(id);

  sendReponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department retieved successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateDepartment(
      id,
      updatedData,
    );

    sendReponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully',
      data: result,
    });
  }),
);

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDepartmentService.deleteDepartment(id);

  sendReponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department deleted successfully',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
