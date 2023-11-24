import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IEmployee } from "./employee.interface";
import Employee from "./employee.model";

const createEmployeeService = async (
  department: IEmployee,
): Promise<IEmployee | null> => {
  return await Employee.create(department);
};

const getEmployeeService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IEmployee[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Employee.find().sort(sortCondition).skip(skip).limit(limit);

  const total = await Employee.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getEmployeeByIdService = async (
  id: string,
): Promise<IEmployee | null> => {
  const res = await Employee.findById(id);
  return res;
};

const updateEmployeeByIdService = async (
  id: string,
  payload: Partial<IEmployee>,
): Promise<IEmployee | null> => {
  const res = await Employee.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteEmployeeByIdService = async (
  id: string,
): Promise<IEmployee | null> => {
  const res = await Employee.findByIdAndDelete(id);
  return res;
};

export const EmployeeService = {
  createEmployeeService,
  getEmployeeByIdService,
  getEmployeeService,
  updateEmployeeByIdService,
  deleteEmployeeByIdService,
};
