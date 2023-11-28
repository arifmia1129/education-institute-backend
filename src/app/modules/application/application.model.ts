import { Schema, model } from "mongoose";
import {
  ApplicationModel,
  IApplication,
  IApplicationMethods,
} from "./application.interface";

const ApplicationSchema = new Schema<
  IApplication,
  ApplicationModel,
  IApplicationMethods
>(
  {
    title: {
      type: String,
      required: true,
    },
    fileUrl: {
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

const Application = model<IApplication, ApplicationModel>(
  "Application",
  ApplicationSchema,
);

export default Application;
