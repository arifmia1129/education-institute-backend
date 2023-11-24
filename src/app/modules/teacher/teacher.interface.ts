import { HydratedDocument, Model } from "mongoose";

export type ITeacher = {
  profileUrl: string;
};

export type ITeacherMethods = {
  fullName(): string;
};

export type TeacherModel = {
  createWithFullName(): Promise<HydratedDocument<ITeacher, ITeacherMethods>>;
  // name: string,
} & Model<ITeacher, object, ITeacherMethods>;
