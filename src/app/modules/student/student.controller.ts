import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { StudentService } from "./student.service";
import { IStudent } from "./student.interface";

const getStudent = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await StudentService.getStudentService(paginationOptions);

  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Student",
    meta: result.meta,
    data: result.data,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.updateStudentService(req.body);
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Student",
    data: result,
  });
});

export const StudentController = {
  getStudent,
  updateStudent,
};
