import { HydratedDocument, Model } from "mongoose";

export type IPlayground = {
  playground: string;
};

export type IPlaygroundMethods = {
  fullName(): string;
};

export type PlaygroundModel = {
  createWithFullName(): Promise<
    HydratedDocument<IPlayground, IPlaygroundMethods>
  >;
  // name: string,
} & Model<IPlayground, object, IPlaygroundMethods>;
