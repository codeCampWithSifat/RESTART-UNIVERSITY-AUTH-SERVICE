/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { StudentService } from "./student.service";
import { studentFilterableFields } from "./student.constant";
import { paginationFields } from "../../../constants/pagination";
import sendReponse from "../../../shared/sendResponse";
import { IStudent } from "./student.interface";
import httpStatus from 'http-status';


const getAllStudents = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
  
    const result = await StudentService.getAllStudents(
      filters,
      paginationOptions
    );
  
    sendReponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  });
  
  const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await StudentService.getSingleStudent(id);
  
    sendReponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieved successfully !',
      data: result,
    });
  });
  
  const updateStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    const result = await StudentService.updateStudent(id, updatedData);
  
    sendReponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student updated successfully !',
      data: result,
    });
  });
  const deleteStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await StudentService.deleteStudent(id);
  
    sendReponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully !',
      // data: result,
    });
  });
  
  export const StudentController = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
  };