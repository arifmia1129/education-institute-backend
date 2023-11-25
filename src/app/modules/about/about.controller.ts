import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { AboutService } from "./about.service";
import { IAbout } from "./about.interface";
import { translator } from "../../../shared/translator";

const getAbout = catchAsync(async (req: Request, res: Response) => {
  const { ln } = req.params;

  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await AboutService.getAboutService(paginationOptions);

  if (result.data.history) {
    const translated = await translator(result.data.history, ln);

    result.data.history = translated;
  }

  sendResponse<IAbout>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get About",
    meta: result.meta,
    data: result.data,
  });
});

const updateAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutService.updateAboutService(req.body);
  sendResponse<IAbout>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated About",
    data: result,
  });
});

export const AboutController = {
  getAbout,
  updateAbout,
};
