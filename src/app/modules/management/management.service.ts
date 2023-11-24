import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IManagement } from "./management.interface";
import Management from "./management.model";

const createManagementService = async (
  department: IManagement,
): Promise<IManagement | null> => {
  return await Management.create(department);
};

const getManagementService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IManagement[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Management.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Management.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getManagementByIdService = async (
  id: string,
): Promise<IManagement | null> => {
  const res = await Management.findById(id);
  return res;
};

const updateManagementByIdService = async (
  id: string,
  payload: Partial<IManagement>,
): Promise<IManagement | null> => {
  const res = await Management.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteManagementByIdService = async (
  id: string,
): Promise<IManagement | null> => {
  const res = await Management.findByIdAndDelete(id);
  return res;
};

export const ManagementService = {
  createManagementService,
  getManagementByIdService,
  getManagementService,
  updateManagementByIdService,
  deleteManagementByIdService,
};
