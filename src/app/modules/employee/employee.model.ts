import { Schema, model } from "mongoose";
import {
  EmployeeModel,
  IEmployee,
  IEmployeeMethods,
} from "./employee.interface";

const EmployeeSchema = new Schema<IEmployee, EmployeeModel, IEmployeeMethods>(
  {
    profileUrl: {
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

const Employee = model<IEmployee, EmployeeModel>("Employee", EmployeeSchema);

export default Employee;
