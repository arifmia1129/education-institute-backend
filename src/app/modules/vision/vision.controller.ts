import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { VisionService } from "./vision.service";
import { IVision } from "./vision.interface";
import { translator } from "../../../shared/translator";

const getVision = catchAsync(async (req: Request, res: Response) => {
  const { ln } = req.params;

  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await VisionService.getVisionService(paginationOptions);

  const translated = await translator(result.data.vision, ln);

  result.data.vision = translated;

  sendResponse<IVision>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Vision",
    meta: result.meta,
    data: result.data,
  });
});

const updateVision = catchAsync(async (req: Request, res: Response) => {
  const result = await VisionService.updateVisionService(req.body);
  sendResponse<IVision>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Vision",
    data: result,
  });
});

export const VisionController = {
  getVision,
  updateVision,
};
