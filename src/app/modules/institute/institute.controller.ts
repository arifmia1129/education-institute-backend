import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { InstituteService } from "./institute.service";
import { IInstitute } from "./institute.interface";

const getInstitute = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await InstituteService.getInstituteService(paginationOptions);

  sendResponse<IInstitute>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Institute",
    meta: result.meta,
    data: result.data,
  });
});

const updateInstitute = catchAsync(async (req: Request, res: Response) => {
  const result = await InstituteService.updateInstituteService(req.body);
  sendResponse<IInstitute>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Institute",
    data: result,
  });
});

export const InstituteController = {
  getInstitute,
  updateInstitute,
};
