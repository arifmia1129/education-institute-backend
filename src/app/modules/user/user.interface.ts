/* eslint-disable no-unused-vars */
import { HydratedDocument, Model, Types } from "mongoose";

export type IUser = {
  id: string;
  role: "student" | "admin" | "faculty";
  password: string;
  changePasswordAt: Date;
  needChangePassword: boolean;
  student: Types.ObjectId;
  faculty: Types.ObjectId;
  admin: Types.ObjectId;
};

export type IUserMethods = {
  isUserExist(
    id: string,
  ): Promise<Pick<
    IUser,
    "id" | "password" | "role" | "needChangePassword"
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type UserModel = {
  createWithFullName(): Promise<HydratedDocument<IUser, IUserMethods>>;
  // name: string,
} & Model<IUser, object, IUserMethods>;
