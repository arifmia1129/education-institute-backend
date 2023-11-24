import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { TotalEmployeeService } from "./totalEmployee.service";
import { ITotalEmployee } from "./totalEmployee.interface";

const getTotalEmployee = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await TotalEmployeeService.getTotalEmployeeService(
    paginationOptions,
  );

  sendResponse<ITotalEmployee>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get TotalEmployee",
    meta: result.meta,
    data: result.data,
  });
});

const updateTotalEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await TotalEmployeeService.updateTotalEmployeeService(
    req.body,
  );
  sendResponse<ITotalEmployee>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated TotalEmployee",
    data: result,
  });
});

export const TotalEmployeeController = {
  getTotalEmployee,
  updateTotalEmployee,
};
