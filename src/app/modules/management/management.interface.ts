import { HydratedDocument, Model } from "mongoose";

export type IManagement = {
  profileUrl: string;
};

export type IManagementMethods = {
  fullName(): string;
};

export type ManagementModel = {
  createWithFullName(): Promise<
    HydratedDocument<IManagement, IManagementMethods>
  >;
  // name: string,
} & Model<IManagement, object, IManagementMethods>;
