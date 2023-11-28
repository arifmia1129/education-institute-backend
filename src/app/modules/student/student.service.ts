import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IStudent } from "./student.interface";
import Student from "./student.model";

const getStudentService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IStudent>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Student.findOne()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res as IStudent,
  };
};

const updateStudentService = async (
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  // Check if any document exists
  const existingStudent = await Student.findOne();

  if (existingStudent) {
    // If it exists, update the existing document
    const updatedStudent = await Student.findOneAndUpdate({}, payload, {
      new: true,
    });
    return updatedStudent;
  } else {
    // If it doesn't exist, create a new document
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const StudentService = {
  getStudentService,
  updateStudentService,
};
