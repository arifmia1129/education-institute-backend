import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IEmployee } from "./employee.interface";
import { paginationField } from "../../constant/pagination";
import { EmployeeService } from "./employee.service";
import { IUploadFile } from "../../../interfaces/common";
import { FileService } from "../file/file.service";

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as IUploadFile;
  const fileRes = await FileService.uploadFile(file);

  const result = await EmployeeService.createEmployeeService({
    profileUrl: fileRes?.url as string,
  });

  sendResponse<IEmployee>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created Employee",
    data: result,
  });
});

const getEmployee = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await EmployeeService.getEmployeeService(paginationOptions);

  sendResponse<IEmployee[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Employee",
    meta: result.meta,
    data: result.data,
  });
});

const getEmployeeById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeService.getEmployeeByIdService(id);
  sendResponse<IEmployee>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Employee",
    data: result,
  });
});

const updateEmployeeById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeService.updateEmployeeByIdService(id, req.body);
  sendResponse<IEmployee>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Employee",
    data: result,
  });
});

const deleteEmployeeById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeService.deleteEmployeeByIdService(id);
  sendResponse<IEmployee>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully deleted Employee",
    data: result,
  });
});

export const EmployeeController = {
  createEmployee,
  getEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};
