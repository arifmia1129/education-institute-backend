import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { CocurricularService } from "./cocurricular.service";
import { ICocurricular } from "./cocurricular.interface";

const getCocurricular = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await CocurricularService.getCocurricularService(
    paginationOptions,
  );

  sendResponse<ICocurricular>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Cocurricular",
    meta: result.meta,
    data: result.data,
  });
});

const updateCocurricular = catchAsync(async (req: Request, res: Response) => {
  const result = await CocurricularService.updateCocurricularService(req.body);
  sendResponse<ICocurricular>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Cocurricular",
    data: result,
  });
});

export const CocurricularController = {
  getCocurricular,
  updateCocurricular,
};
