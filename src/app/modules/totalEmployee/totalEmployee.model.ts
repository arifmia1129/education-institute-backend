import { Schema, model } from "mongoose";
import {
  TotalEmployeeModel,
  ITotalEmployee,
  ITotalEmployeeMethods,
} from "./totalEmployee.interface";

const TotalEmployeeSchema = new Schema<
  ITotalEmployee,
  TotalEmployeeModel,
  ITotalEmployeeMethods
>(
  {
    allowedTeacher: {
      type: String,
      required: true,
    },
    currentTeacher: {
      type: String,
      required: true,
    },
    maleTeacher: {
      type: String,
      required: true,
    },
    femaleTeacher: {
      type: String,
      required: true,
    },
    allowedOtherEmployee: {
      type: String,
      required: true,
    },
    currentOtherEmployee: {
      type: String,
      required: true,
    },
    maleOtherEmployee: {
      type: String,
      required: true,
    },
    femaleOtherOtherEmployee: {
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

const TotalEmployee = model<ITotalEmployee, TotalEmployeeModel>(
  "TotalEmployee",
  TotalEmployeeSchema,
);

export default TotalEmployee;
