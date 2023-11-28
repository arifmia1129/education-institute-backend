import { Schema, model } from "mongoose";
import { StudentModel, IStudent, IStudentMethods } from "./student.interface";

const StudentSchema = new Schema<IStudent, StudentModel, IStudentMethods>(
  {
    class6: {
      male: Number,
      female: Number,
      total: Number,
    },
    class7: {
      male: Number,
      female: Number,
      total: Number,
    },
    class8: {
      male: Number,
      female: Number,
      total: Number,
    },
    class9: {
      male: Number,
      female: Number,
      total: Number,
      science: Number,
      arts: Number,
    },
    class10: {
      male: Number,
      female: Number,
      total: Number,
      science: Number,
      arts: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Student = model<IStudent, StudentModel>("Student", StudentSchema);

export default Student;
