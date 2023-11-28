import { HydratedDocument, Model } from "mongoose";

export type ITeaching = {
  title: string;
  fileUrl: string;
};

export type ITeachingMethods = {
  fullName(): string;
};

export type TeachingModel = {
  createWithFullName(): Promise<HydratedDocument<ITeaching, ITeachingMethods>>;
  // name: string,
} & Model<ITeaching, object, ITeachingMethods>;
