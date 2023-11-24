import { HydratedDocument, Model } from "mongoose";

export type ITotalEmployee = {
  allowedTeacher: string;
  currentTeacher: string;
  maleTeacher: string;
  femaleTeacher: string;
  allowedOtherEmployee: string;
  currentOtherEmployee: string;
  maleOtherEmployee: string;
  femaleOtherOtherEmployee: string;
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
