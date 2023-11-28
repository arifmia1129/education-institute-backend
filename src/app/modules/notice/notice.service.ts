import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { INotice } from "./notice.interface";
import Notice from "./notice.model";

const createNoticeService = async (
  department: INotice,
): Promise<INotice | null> => {
  return await Notice.create(department);
};

const getNoticeService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<INotice[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Notice.find().sort(sortCondition).skip(skip).limit(limit);

  const total = await Notice.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getNoticeByIdService = async (id: string): Promise<INotice | null> => {
  const res = await Notice.findById(id);
  return res;
};

const updateNoticeByIdService = async (
  id: string,
  payload: Partial<INotice>,
): Promise<INotice | null> => {
  const res = await Notice.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

const deleteNoticeByIdService = async (id: string): Promise<INotice | null> => {
  const res = await Notice.findByIdAndDelete(id);
  return res;
};

export const NoticeService = {
  createNoticeService,
  getNoticeByIdService,
  getNoticeService,
  updateNoticeByIdService,
  deleteNoticeByIdService,
};
