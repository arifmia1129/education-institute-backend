import { HydratedDocument, Model } from "mongoose";

export type IInstitute = {
  history: string;
  mpo: string;
  land: string;
  landOwner: string;
  teacherPresent: string;
  employeePresent: string;
  playground: string;
  computerLab: string;
  multimediaClass: string;
  extraCurriculum: string;
};

export type IInstituteMethods = {
  fullName(): string;
};

export type InstituteModel = {
  createWithFullName(): Promise<
    HydratedDocument<IInstitute, IInstituteMethods>
  >;
  // name: string,
} & Model<IInstitute, object, IInstituteMethods>;
