import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { ICocurricular } from "./cocurricular.interface";
import Cocurricular from "./cocurricular.model";

const getCocurricularService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<ICocurricular>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Cocurricular.findOne()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Cocurricular.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res as ICocurricular,
  };
};

const updateCocurricularService = async (
  payload: Partial<ICocurricular>,
): Promise<ICocurricular | null> => {
  // Check if any document exists
  const existingCocurricular = await Cocurricular.findOne();

  if (existingCocurricular) {
    // If it exists, update the existing document
    const updatedCocurricular = await Cocurricular.findOneAndUpdate(
      {},
      payload,
      {
        new: true,
      },
    );
    return updatedCocurricular;
  } else {
    // If it doesn't exist, create a new document
    const newCocurricular = await Cocurricular.create(payload);
    return newCocurricular;
  }
};

export const CocurricularService = {
  getCocurricularService,
  updateCocurricularService,
};
