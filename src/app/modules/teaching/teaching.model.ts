import { Schema, model } from "mongoose";
import {
  TeachingModel,
  ITeaching,
  ITeachingMethods,
} from "./teaching.interface";

const TeachingSchema = new Schema<ITeaching, TeachingModel, ITeachingMethods>(
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

const Teaching = model<ITeaching, TeachingModel>("Teaching", TeachingSchema);

export default Teaching;
