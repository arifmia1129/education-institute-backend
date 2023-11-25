import { HydratedDocument, Model } from "mongoose";

export type ITotalEmployee = {
  allowedTeacher: number;
  currentTeacher: number;
  maleTeacher: number;
  femaleTeacher: number;
  allowedOtherEmployee: number;
  currentOtherEmployee: number;
  maleOtherEmployee: number;
  femaleOtherEmployee: number;
};

export type ITotalEmployeeMethods = {
  fullName(): string;
};

export type TotalEmployeeModel = {
  createWithFullName(): Promise<
    HydratedDocument<ITotalEmployee, ITotalEmployeeMethods>
  >;
  // name: string,
} & Model<ITotalEmployee, object, ITotalEmployeeMethods>;
