import { HydratedDocument, Model } from "mongoose";

export type IStatistic = {
  establishedYear: string;
  totalTeacher: string;
  totalStudent: string;
  passedTotalStudent: string;
  totalClass: string;
  field: string;
  studentPresentPercentage: string;
  gpaFivePercentage: string;
};

export type IStatisticMethods = {
  fullName(): string;
};

export type StatisticModel = {
  createWithFullName(): Promise<
    HydratedDocument<IStatistic, IStatisticMethods>
  >;
  // name: string,
} & Model<IStatistic, object, IStatisticMethods>;
