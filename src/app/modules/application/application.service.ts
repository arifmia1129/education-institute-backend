import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IApplication } from "./application.interface";
import Application from "./application.model";

const createApplicationService = async (
  department: IApplication,
): Promise<IApplication | null> => {
  return await Application.create(department);
};

const getApplicationService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IApplication[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Application.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Application.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getApplicationByIdService = async (
  id: string,
): Promise<IApplication | null> => {
  const res = await Application.findById(id);
  return res;
};

const updateApplicationByIdService = async (
  id: string,
  payload: Partial<IApplication>,
): Promise<IApplication | null> => {
  const res = await Application.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteApplicationByIdService = async (
  id: string,
): Promise<IApplication | null> => {
  const res = await Application.findByIdAndDelete(id);
  return res;
};

export const ApplicationService = {
  createApplicationService,
  getApplicationByIdService,
  getApplicationService,
  updateApplicationByIdService,
  deleteApplicationByIdService,
};
