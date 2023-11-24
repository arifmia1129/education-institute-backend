import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { MissionService } from "./mission.service";
import { IMission } from "./mission.interface";
import { translator } from "../../../shared/translator";

const getMission = catchAsync(async (req: Request, res: Response) => {
  const { ln } = req.params;

  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await MissionService.getMissionService(paginationOptions);

  const translated = await translator(result.data.mission, ln);

  result.data.mission = translated;

  sendResponse<IMission>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Mission",
    meta: result.meta,
    data: result.data,
  });
});

const updateMission = catchAsync(async (req: Request, res: Response) => {
  const result = await MissionService.updateMissionService(req.body);
  sendResponse<IMission>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Mission",
    data: result,
  });
});

export const MissionController = {
  getMission,
  updateMission,
};
