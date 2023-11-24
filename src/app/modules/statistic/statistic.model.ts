import { Schema, model } from "mongoose";
import {
  StatisticModel,
  IStatistic,
  IStatisticMethods,
} from "./statistic.interface";

const StatisticSchema = new Schema<
  IStatistic,
  StatisticModel,
  IStatisticMethods
>(
  {
    establishedYear: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    gpaFivePercentage: {
      type: String,
      required: true,
    },
    passedTotalStudent: {
      type: String,
      required: true,
    },
    studentPresentPercentage: {
      type: String,
      required: true,
    },
    totalClass: {
      type: String,
      required: true,
    },
    totalStudent: {
      type: String,
      required: true,
    },
    totalTeacher: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Statistic = model<IStatistic, StatisticModel>(
  "Statistic",
  StatisticSchema,
);

export default Statistic;
