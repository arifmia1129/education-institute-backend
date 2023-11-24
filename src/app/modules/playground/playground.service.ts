import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IPlayground } from "./playground.interface";
import Playground from "./playground.model";

const getPlaygroundService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IPlayground>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Playground.findOne()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Playground.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res as IPlayground,
  };
};

const updatePlaygroundService = async (
  payload: Partial<IPlayground>,
): Promise<IPlayground | null> => {
  // Check if any document exists
  const existingPlayground = await Playground.findOne();

  if (existingPlayground) {
    // If it exists, update the existing document
    const updatedPlayground = await Playground.findOneAndUpdate({}, payload, {
      new: true,
    });
    return updatedPlayground;
  } else {
    // If it doesn't exist, create a new document
    const newPlayground = await Playground.create(payload);
    return newPlayground;
  }
};

export const PlaygroundService = {
  getPlaygroundService,
  updatePlaygroundService,
};
