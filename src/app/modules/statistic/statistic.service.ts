import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IStatistic } from "./statistic.interface";
import Statistic from "./statistic.model";

const getStatisticService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IStatistic>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await Statistic.findOne()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Statistic.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res as IStatistic,
  };
};

const updateStatisticService = async (
  payload: Partial<IStatistic>,
): Promise<IStatistic | null> => {
  // Check if any document exists
  const existingStatistic = await Statistic.findOne();

  if (existingStatistic) {
    // If it exists, update the existing document
    const updatedStatistic = await Statistic.findOneAndUpdate({}, payload, {
      new: true,
    });
    return updatedStatistic;
  } else {
    // If it doesn't exist, create a new document
    const newStatistic = await Statistic.create(payload);
    return newStatistic;
  }
};

export const StatisticService = {
  getStatisticService,
  updateStatisticService,
};
