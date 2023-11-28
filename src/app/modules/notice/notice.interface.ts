import { HydratedDocument, Model } from "mongoose";

export type INotice = {
  date: string;
  title: string;
  fileUrl: string;
};

export type INoticeMethods = {
  fullName(): string;
};

export type NoticeModel = {
  createWithFullName(): Promise<HydratedDocument<INotice, INoticeMethods>>;
  // name: string,
} & Model<INotice, object, INoticeMethods>;
