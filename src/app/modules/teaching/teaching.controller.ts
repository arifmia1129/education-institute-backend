import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { ITeaching } from "./teaching.interface";
import { paginationField } from "../../constant/pagination";
import { TeachingService } from "./teaching.service";
import { translator } from "../../../shared/translator";

const createTeaching = catchAsync(async (req: Request, res: Response) => {
  const result = await TeachingService.createTeachingService(req.body);

  sendResponse<ITeaching>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created Teaching",
    data: result,
  });
});

const getTeaching = catchAsync(async (req: Request, res: Response) => {
  const { ln } = req.params;
  const paginationOptions: Pagination = pick(req.query, paginationField);
  const result = await TeachingService.getTeachingService(paginationOptions);

  if (result.data.length) {
    const translatedTeachings = await Promise.all(
      result.data.map(async Teaching => {
        const translatedTitle = await translator(Teaching.title, ln);
        Teaching.title = translatedTitle;
        return Teaching;
      }),
    );

    result.data = translatedTeachings;
  }

  sendResponse<ITeaching[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Teaching",
    meta: result.meta,
    data: result.data,
  });
});

const getTeachingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeachingService.getTeachingByIdService(id);
  sendResponse<ITeaching>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Teaching",
    data: result,
  });
});

const updateTeachingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeachingService.updateTeachingByIdService(id, req.body);
  sendResponse<ITeaching>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Teaching",
    data: result,
  });
});

const deleteTeachingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeachingService.deleteTeachingByIdService(id);
  sendResponse<ITeaching>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully deleted Teaching",
    data: result,
  });
});

export const TeachingController = {
  createTeaching,
  getTeaching,
  getTeachingById,
  updateTeachingById,
  deleteTeachingById,
};
