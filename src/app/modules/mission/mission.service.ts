import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IMission } from "./mission.interface";
import Mission from "./mission.model";

const getMissionService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IMission>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Mission.findOne()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Mission.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res as IMission,
  };
};

const updateMissionService = async (
  payload: Partial<IMission>,
): Promise<IMission | null> => {
  // Check if any document exists
  const existingMission = await Mission.findOne();

  if (existingMission) {
    // If it exists, update the existing document
    const updatedMission = await Mission.findOneAndUpdate({}, payload, {
      new: true,
    });
    return updatedMission;
  } else {
    // If it doesn't exist, create a new document
    const newMission = await Mission.create(payload);
    return newMission;
  }
};

export const MissionService = {
  getMissionService,
  updateMissionService,
};
