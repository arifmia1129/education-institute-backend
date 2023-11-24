import { HydratedDocument, Model } from "mongoose";

export type IMission = {
  mission: string;
};

export type IMissionMethods = {
  fullName(): string;
};

export type MissionModel = {
  createWithFullName(): Promise<HydratedDocument<IMission, IMissionMethods>>;
  // name: string,
} & Model<IMission, object, IMissionMethods>;
