import { HydratedDocument, Model } from "mongoose";

export type IExam = {
  title: string;
  fileUrl: string;
};

export type IExamMethods = {
  fullName(): string;
};

export type ExamModel = {
  createWithFullName(): Promise<HydratedDocument<IExam, IExamMethods>>;
  // name: string,
} & Model<IExam, object, IExamMethods>;
