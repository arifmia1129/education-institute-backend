import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { ITotalEmployee } from "./totalEmployee.interface";
import TotalEmployee from "./totalEmployee.model";

const getTotalEmployeeService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<ITotalEmployee>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await TotalEmployee.findOne()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await TotalEmployee.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res as ITotalEmployee,
  };
};

const updateTotalEmployeeService = async (
  payload: Partial<ITotalEmployee>,
): Promise<ITotalEmployee | null> => {
  // Check if any document exists
  const existingTotalEmployee = await TotalEmployee.findOne();

  if (existingTotalEmployee) {
    // If it exists, update the existing document
    const updatedTotalEmployee = await TotalEmployee.findOneAndUpdate(
      {},
      payload,
      {
        new: true,
      },
    );
    return updatedTotalEmployee;
  } else {
    // If it doesn't exist, create a new document
    const newTotalEmployee = await TotalEmployee.create(payload);
    return newTotalEmployee;
  }
};

export const TotalEmployeeService = {
  getTotalEmployeeService,
  updateTotalEmployeeService,
};
