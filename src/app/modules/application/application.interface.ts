import { HydratedDocument, Model } from "mongoose";

export type IApplication = {
  title: string;
  fileUrl: string;
};

export type IApplicationMethods = {
  fullName(): string;
};

export type ApplicationModel = {
  createWithFullName(): Promise<
    HydratedDocument<IApplication, IApplicationMethods>
  >;
  // name: string,
} & Model<IApplication, object, IApplicationMethods>;
