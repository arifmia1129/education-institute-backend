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
      type: Number,
      required: true,
    },
    currentTeacher: {
      type: Number,
      required: true,
    },
    maleTeacher: {
      type: Number,
      required: true,
    },
    femaleTeacher: {
      type: Number,
      required: true,
    },
    allowedOtherEmployee: {
      type: Number,
      required: true,
    },
    currentOtherEmployee: {
      type: Number,
      required: true,
    },
    maleOtherEmployee: {
      type: Number,
      required: true,
    },
    femaleOtherEmployee: {
      type: Number,
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
