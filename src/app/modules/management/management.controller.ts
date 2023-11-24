import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IManagement } from "./management.interface";
import { paginationField } from "../../constant/pagination";
import { ManagementService } from "./management.service";
import { IUploadFile } from "../../../interfaces/common";
import { FileService } from "../file/file.service";

const createManagement = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as IUploadFile;
  const fileRes = await FileService.uploadFile(file);

  const result = await ManagementService.createManagementService({
    profileUrl: fileRes?.url as string,
  });

  sendResponse<IManagement>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created Management",
    data: result,
  });
});

const getManagement = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await ManagementService.getManagementService(
    paginationOptions,
  );

  sendResponse<IManagement[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Management",
    meta: result.meta,
    data: result.data,
  });
});

const getManagementById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementService.getManagementByIdService(id);
  sendResponse<IManagement>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Management",
    data: result,
  });
});

const updateManagementById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementService.updateManagementByIdService(
    id,
    req.body,
  );
  sendResponse<IManagement>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Management",
    data: result,
  });
});

const deleteManagementById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementService.deleteManagementByIdService(id);
  sendResponse<IManagement>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully deleted Management",
    data: result,
  });
});

export const ManagementController = {
  createManagement,
  getManagement,
  getManagementById,
  updateManagementById,
  deleteManagementById,
};
