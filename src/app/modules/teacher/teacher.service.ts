import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { ITeacher } from "./teacher.interface";
import Teacher from "./teacher.model";

const createTeacherService = async (
  department: ITeacher,
): Promise<ITeacher | null> => {
  return await Teacher.create(department);
};

const getTeacherService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<ITeacher[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Teacher.find().sort(sortCondition).skip(skip).limit(limit);

  const total = await Teacher.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getTeacherByIdService = async (id: string): Promise<ITeacher | null> => {
  const res = await Teacher.findById(id);
  return res;
};

const updateTeacherByIdService = async (
  id: string,
  payload: Partial<ITeacher>,
): Promise<ITeacher | null> => {
  const res = await Teacher.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteTeacherByIdService = async (
  id: string,
): Promise<ITeacher | null> => {
  const res = await Teacher.findByIdAndDelete(id);
  return res;
};

export const TeacherService = {
  createTeacherService,
  getTeacherByIdService,
  getTeacherService,
  updateTeacherByIdService,
  deleteTeacherByIdService,
};
