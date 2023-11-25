import { Schema, model } from "mongoose";
import { MPOModel, IMPO, IMPOMethods } from "./mpo.interface";

const MPOSchema = new Schema<IMPO, MPOModel, IMPOMethods>(
  {
    mpo: {
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

const MPO = model<IMPO, MPOModel>("MPO", MPOSchema);

export default MPO;
