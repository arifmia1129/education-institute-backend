import { Schema, model } from "mongoose";
import { AboutModel, IAbout, IAboutMethods } from "./about.interface";

const AboutSchema = new Schema<IAbout, AboutModel, IAboutMethods>(
  {
    history: {
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

const About = model<IAbout, AboutModel>("About", AboutSchema);

export default About;
