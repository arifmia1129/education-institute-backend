import { Schema, model } from "mongoose";
import {
  PlaygroundModel,
  IPlayground,
  IPlaygroundMethods,
} from "./playground.interface";

const PlaygroundSchema = new Schema<
  IPlayground,
  PlaygroundModel,
  IPlaygroundMethods
>(
  {
    playground: {
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

const Playground = model<IPlayground, PlaygroundModel>(
  "Playground",
  PlaygroundSchema,
);

export default Playground;
