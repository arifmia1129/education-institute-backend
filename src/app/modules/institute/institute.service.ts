import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IInstitute } from "./institute.interface";
import Institute from "./institute.model";

const getInstituteService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IInstitute>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Institute.findOne()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Institute.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res as IInstitute,
  };
};

const updateInstituteService = async (
  payload: Partial<IInstitute>,
): Promise<IInstitute | null> => {
  // Check if any document exists
  const existingInstitute = await Institute.findOne();

  if (existingInstitute) {
    // If it exists, update the existing document
    const updatedInstitute = await Institute.findOneAndUpdate({}, payload, {
      new: true,
    });
    return updatedInstitute;
  } else {
    // If it doesn't exist, create a new document
    const newInstitute = await Institute.create(payload);
    return newInstitute;
  }
};

export const InstituteService = {
  getInstituteService,
  updateInstituteService,
};
