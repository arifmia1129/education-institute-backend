import { Schema, model } from "mongoose";
import {
  CocurricularModel,
  ICocurricular,
  ICocurricularMethods,
} from "./cocurricular.interface";

const CocurricularSchema = new Schema<
  ICocurricular,
  CocurricularModel,
  ICocurricularMethods
>(
  {
    scoutInfo: String,
    scienceClubInfo: String,
    culturalClubInfo: String,
    educationClubInfo: String,
    ictClubInfo: String,
    otherActitiesInfo: String,
    sportsClubInfo: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Cocurricular = model<ICocurricular, CocurricularModel>(
  "Cocurricular",
  CocurricularSchema,
);

export default Cocurricular;
