import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { ITeacher } from "./teacher.interface";
import { paginationField } from "../../constant/pagination";
import { TeacherService } from "./teacher.service";
import { IUploadFile } from "../../../interfaces/common";
import { FileService } from "../file/file.service";

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as IUploadFile;
  const fileRes = await FileService.uploadFile(file);

  const result = await TeacherService.createTeacherService({
    profileUrl: fileRes?.url as string,
  });

  sendResponse<ITeacher>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created teacher",
    data: result,
  });
});

const getTeacher = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await TeacherService.getTeacherService(paginationOptions);

  sendResponse<ITeacher[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get teacher",
    meta: result.meta,
    data: result.data,
  });
});

const getTeacherById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherService.getTeacherByIdService(id);
  sendResponse<ITeacher>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get teacher",
    data: result,
  });
});

const updateTeacherById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherService.updateTeacherByIdService(id, req.body);
  sendResponse<ITeacher>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated teacher",
    data: result,
  });
});

const deleteTeacherById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherService.deleteTeacherByIdService(id);
  sendResponse<ITeacher>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully deleted teacher",
    data: result,
  });
});

export const TeacherController = {
  createTeacher,
  getTeacher,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
};
