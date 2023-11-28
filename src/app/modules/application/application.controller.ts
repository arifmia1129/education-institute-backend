import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IApplication } from "./application.interface";
import { paginationField } from "../../constant/pagination";
import { ApplicationService } from "./application.service";
import { translator } from "../../../shared/translator";

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await ApplicationService.createApplicationService(req.body);

  sendResponse<IApplication>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created Application",
    data: result,
  });
});

const getApplication = catchAsync(async (req: Request, res: Response) => {
  const { ln } = req.params;
  const paginationOptions: Pagination = pick(req.query, paginationField);
  const result = await ApplicationService.getApplicationService(
    paginationOptions,
  );

  if (result.data.length) {
    const translatedApplications = await Promise.all(
      result.data.map(async Application => {
        const translatedTitle = await translator(Application.title, ln);
        Application.title = translatedTitle;
        return Application;
      }),
    );

    result.data = translatedApplications;
  }

  sendResponse<IApplication[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Application",
    meta: result.meta,
    data: result.data,
  });
});

const getApplicationById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ApplicationService.getApplicationByIdService(id);
  sendResponse<IApplication>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Application",
    data: result,
  });
});

const updateApplicationById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ApplicationService.updateApplicationByIdService(
      id,
      req.body,
    );
    sendResponse<IApplication>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully updated Application",
      data: result,
    });
  },
);

const deleteApplicationById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ApplicationService.deleteApplicationByIdService(id);
    sendResponse<IApplication>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully deleted Application",
      data: result,
    });
  },
);

export const ApplicationController = {
  createApplication,
  getApplication,
  getApplicationById,
  updateApplicationById,
  deleteApplicationById,
};
