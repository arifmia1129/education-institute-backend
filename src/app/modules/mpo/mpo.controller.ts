import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { MPOService } from "./mpo.service";
import { IMPO } from "./mpo.interface";
import { translator } from "../../../shared/translator";

const getMPO = catchAsync(async (req: Request, res: Response) => {
  const { ln } = req.params;

  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await MPOService.getMPOService(paginationOptions);

  const translated = await translator(result.data.mpo, ln);

  result.data.mpo = translated;

  sendResponse<IMPO>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get MPO",
    meta: result.meta,
    data: result.data,
  });
});

const updateMPO = catchAsync(async (req: Request, res: Response) => {
  const result = await MPOService.updateMPOService(req.body);
  sendResponse<IMPO>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated MPO",
    data: result,
  });
});

export const MPOController = {
  getMPO,
  updateMPO,
};
