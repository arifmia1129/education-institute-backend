import { Schema, model } from "mongoose";
import { VisionModel, IVision, IVisionMethods } from "./vision.interface";

const VisionSchema = new Schema<IVision, VisionModel, IVisionMethods>(
  {
    vision: {
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

const Vision = model<IVision, VisionModel>("Vision", VisionSchema);

export default Vision;
