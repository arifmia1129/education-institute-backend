import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IExam } from "./exam.interface";
import Exam from "./exam.model";

const createExamService = async (department: IExam): Promise<IExam | null> => {
  return await Exam.create(department);
};

const getExamService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IExam[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Exam.find().sort(sortCondition).skip(skip).limit(limit);

  const total = await Exam.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getExamByIdService = async (id: string): Promise<IExam | null> => {
  const res = await Exam.findById(id);
  return res;
};

const updateExamByIdService = async (
  id: string,
  payload: Partial<IExam>,
): Promise<IExam | null> => {
  const res = await Exam.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteExamByIdService = async (id: string): Promise<IExam | null> => {
  const res = await Exam.findByIdAndDelete(id);
  return res;
};

export const ExamService = {
  createExamService,
  getExamByIdService,
  getExamService,
  updateExamByIdService,
  deleteExamByIdService,
};
