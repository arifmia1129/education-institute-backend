import { HydratedDocument, Model } from "mongoose";

type StudentInfo = {
  male: number;
  female: number;
  total: number;
  science?: number;
  arts?: number;
};

export type IStudent = {
  class6: StudentInfo;
  class7: StudentInfo;
  class8: StudentInfo;
  class9: StudentInfo;
  class10: StudentInfo;
};

export type IStudentMethods = {
  fullName(): string;
};

export type StudentModel = {
  createWithFullName(): Promise<HydratedDocument<IStudent, IStudentMethods>>;
  // name: string,
} & Model<IStudent, object, IStudentMethods>;
