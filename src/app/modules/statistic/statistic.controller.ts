import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { StatisticService } from "./statistic.service";
import { IStatistic } from "./statistic.interface";

const getStatistic = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await StatisticService.getStatisticService(paginationOptions);

  sendResponse<IStatistic>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Statistic",
    meta: result.meta,
    data: result.data,
  });
});

const updateStatistic = catchAsync(async (req: Request, res: Response) => {
  const result = await StatisticService.updateStatisticService(req.body);
  sendResponse<IStatistic>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Statistic",
    data: result,
  });
});

export const StatisticController = {
  getStatistic,
  updateStatistic,
};
