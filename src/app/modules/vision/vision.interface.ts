import { HydratedDocument, Model } from "mongoose";

export type IVision = {
  vision: string;
};

export type IVisionMethods = {
  fullName(): string;
};

export type VisionModel = {
  createWithFullName(): Promise<HydratedDocument<IVision, IVisionMethods>>;
  // name: string,
} & Model<IVision, object, IVisionMethods>;
