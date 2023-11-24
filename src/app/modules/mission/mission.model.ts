import { Schema, model } from "mongoose";
import { MissionModel, IMission, IMissionMethods } from "./mission.interface";

const MissionSchema = new Schema<IMission, MissionModel, IMissionMethods>(
  {
    mission: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Mission = model<IMission, MissionModel>("Mission", MissionSchema);

export default Mission;
