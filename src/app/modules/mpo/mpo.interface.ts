import { HydratedDocument, Model } from "mongoose";

export type IMPO = {
  mpo: string;
};

export type IMPOMethods = {
  fullName(): string;
};

export type MPOModel = {
  createWithFullName(): Promise<HydratedDocument<IMPO, IMPOMethods>>;
  // name: string,
} & Model<IMPO, object, IMPOMethods>;
