import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { PlaygroundService } from "./playground.service";
import { IPlayground } from "./playground.interface";
import { translator } from "../../../shared/translator";

const getPlayground = catchAsync(async (req: Request, res: Response) => {
  const { ln } = req.params;

  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await PlaygroundService.getPlaygroundService(
    paginationOptions,
  );

  const translated = await translator(result.data.playground, ln);

  result.data.playground = translated;

  sendResponse<IPlayground>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Playground",
    meta: result.meta,
    data: result.data,
  });
});

const updatePlayground = catchAsync(async (req: Request, res: Response) => {
  const result = await PlaygroundService.updatePlaygroundService(req.body);
  sendResponse<IPlayground>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Playground",
    data: result,
  });
});

export const PlaygroundController = {
  getPlayground,
  updatePlayground,
};
