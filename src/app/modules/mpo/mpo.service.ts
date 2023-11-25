import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IMPO } from "./mpo.interface";
import MPO from "./mpo.model";

const getMPOService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IMPO>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await MPO.findOne().sort(sortCondition).skip(skip).limit(limit);

  const total = await MPO.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res as IMPO,
  };
};

const updateMPOService = async (
  payload: Partial<IMPO>,
): Promise<IMPO | null> => {
  // Check if any document exists
  const existingMPO = await MPO.findOne();

  if (existingMPO) {
    // If it exists, update the existing document
    const updatedMPO = await MPO.findOneAndUpdate({}, payload, {
      new: true,
    });
    return updatedMPO;
  } else {
    // If it doesn't exist, create a new document
    const newMPO = await MPO.create(payload);
    return newMPO;
  }
};

export const MPOService = {
  getMPOService,
  updateMPOService,
};
