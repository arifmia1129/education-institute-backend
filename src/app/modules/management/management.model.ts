import { Schema, model } from "mongoose";
import {
  ManagementModel,
  IManagement,
  IManagementMethods,
} from "./management.interface";

const ManagementSchema = new Schema<
  IManagement,
  ManagementModel,
  IManagementMethods
>(
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

const Management = model<IManagement, ManagementModel>(
  "Management",
  ManagementSchema,
);

export default Management;
