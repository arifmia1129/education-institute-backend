import { Schema, model } from "mongoose";
import {
  InstituteModel,
  IInstitute,
  IInstituteMethods,
} from "./institute.interface";

const InstituteSchema = new Schema<
  IInstitute,
  InstituteModel,
  IInstituteMethods
>(
  {
    computerLab: String,
    employeePresent: String,
    extraCurriculum: String,
    history: String,
    land: String,
    landOwner: String,
    mpo: String,
    multimediaClass: String,
    playground: String,
    teacherPresent: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Institute = model<IInstitute, InstituteModel>(
  "Institute",
  InstituteSchema,
);

export default Institute;
