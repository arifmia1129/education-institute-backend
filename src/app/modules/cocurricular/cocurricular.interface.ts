import { HydratedDocument, Model } from "mongoose";

export type ICocurricular = {
  scoutInfo: string;
  scienceClubInfo: string;
  culturalClubInfo: string;
  educationClubInfo: string;
  sportsClubInfo: string;
  ictClubInfo: string;
  otherActitiesInfo: string;
};

export type ICocurricularMethods = {
  fullName(): string;
};

export type CocurricularModel = {
  createWithFullName(): Promise<
    HydratedDocument<ICocurricular, ICocurricularMethods>
  >;
  // name: string,
} & Model<ICocurricular, object, ICocurricularMethods>;
