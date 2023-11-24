import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IAbout } from "./about.interface";
import About from "./about.model";

const getAboutService = async (
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IAbout>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await About.findOne().sort(sortCondition).skip(skip).limit(limit);

  const total = await About.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res as IAbout,
  };
};

const updateAboutService = async (
  payload: Partial<IAbout>,
): Promise<IAbout | null> => {
  // Check if any document exists
  const existingAbout = await About.findOne();

  if (existingAbout) {
    // If it exists, update the existing document
    const updatedAbout = await About.findOneAndUpdate({}, payload, {
      new: true,
    });
    return updatedAbout;
  } else {
    // If it doesn't exist, create a new document
    const newAbout = await About.create(payload);
    return newAbout;
  }
};

export const AboutService = {
  getAboutService,
  updateAboutService,
};
