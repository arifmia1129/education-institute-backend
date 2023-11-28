import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { ITeaching } from "./teaching.interface";
import Teaching from "./teaching.model";

const createTeachingService = async (
  department: ITeaching,
): Promise<ITeaching | null> => {
  return await Teaching.create(department);
};

const getTeachingService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<ITeaching[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Teaching.find().sort(sortCondition).skip(skip).limit(limit);

  const total = await Teaching.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getTeachingByIdService = async (
  id: string,
): Promise<ITeaching | null> => {
  const res = await Teaching.findById(id);
  return res;
};

const updateTeachingByIdService = async (
  id: string,
  payload: Partial<ITeaching>,
): Promise<ITeaching | null> => {
  const res = await Teaching.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteTeachingByIdService = async (
  id: string,
): Promise<ITeaching | null> => {
  const res = await Teaching.findByIdAndDelete(id);
  return res;
};

export const TeachingService = {
  createTeachingService,
  getTeachingByIdService,
  getTeachingService,
  updateTeachingByIdService,
  deleteTeachingByIdService,
};
