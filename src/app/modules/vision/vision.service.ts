import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IVision } from "./vision.interface";
import Vision from "./vision.model";

const getVisionService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IVision>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Vision.findOne()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Vision.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res as IVision,
  };
};

const updateVisionService = async (
  payload: Partial<IVision>,
): Promise<IVision | null> => {
  // Check if any document exists
  const existingVision = await Vision.findOne();

  if (existingVision) {
    // If it exists, update the existing document
    const updatedVision = await Vision.findOneAndUpdate({}, payload, {
      new: true,
    });
    return updatedVision;
  } else {
    // If it doesn't exist, create a new document
    const newVision = await Vision.create(payload);
    return newVision;
  }
};

export const VisionService = {
  getVisionService,
  updateVisionService,
};
