import { Schema, model } from "mongoose";
import { ExamModel, IExam, IExamMethods } from "./exam.interface";

const ExamSchema = new Schema<IExam, ExamModel, IExamMethods>(
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

const Exam = model<IExam, ExamModel>("Exam", ExamSchema);

export default Exam;
