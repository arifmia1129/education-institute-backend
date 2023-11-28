import { Schema, model } from "mongoose";
import { NoticeModel, INotice, INoticeMethods } from "./notice.interface";

const NoticeSchema = new Schema<INotice, NoticeModel, INoticeMethods>(
  {
    date: {
      type: String,
      required: true,
    },
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

const Notice = model<INotice, NoticeModel>("Notice", NoticeSchema);

export default Notice;
