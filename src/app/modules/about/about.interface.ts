import { HydratedDocument, Model } from "mongoose";

export type IAbout = {
  history: string;
};

export type IAboutMethods = {
  fullName(): string;
};

export type AboutModel = {
  createWithFullName(): Promise<HydratedDocument<IAbout, IAboutMethods>>;
  // name: string,
} & Model<IAbout, object, IAboutMethods>;
