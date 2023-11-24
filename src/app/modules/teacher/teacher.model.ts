import { Schema, model } from "mongoose";
import { TeacherModel, ITeacher, ITeacherMethods } from "./teacher.interface";

const TeacherSchema = new Schema<ITeacher, TeacherModel, ITeacherMethods>(
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

const Teacher = model<ITeacher, TeacherModel>("Teacher", TeacherSchema);

export default Teacher;
