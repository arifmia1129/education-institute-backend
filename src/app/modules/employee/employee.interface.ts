import { HydratedDocument, Model } from "mongoose";

export type IEmployee = {
  profileUrl: string;
};

export type IEmployeeMethods = {
  fullName(): string;
};

export type EmployeeModel = {
  createWithFullName(): Promise<HydratedDocument<IEmployee, IEmployeeMethods>>;
  // name: string,
} & Model<IEmployee, object, IEmployeeMethods>;
