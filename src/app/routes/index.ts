import { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import { AboutRouter } from "../modules/about/about.route";
import { FileRouter } from "../modules/file/file.route";
import { TeacherRouter } from "../modules/teacher/teacher.route";
import { ManagementRouter } from "../modules/management/management.route";
import { EmployeeRouter } from "../modules/employee/employee.route";
import { MissionRouter } from "../modules/mission/mission.route";
import { VisionRouter } from "../modules/vision/vision.route";
import { StatisticRouter } from "../modules/statistic/statistic.route";
import { TotalEmployeeRouter } from "../modules/totalEmployee/totalEmployee.route";
import { PlaygroundRouter } from "../modules/playground/playground.route";
import { MPORouter } from "../modules/mpo/mpo.route";
import { NoticeRouter } from "../modules/notice/notice.route";
import { ApplicationRouter } from "../modules/application/application.route";
import { ExamRouter } from "../modules/exam/exam.route";
import { StudentRouter } from "../modules/student/student.route";
import { CocurricularRouter } from "../modules/cocurricular/cocurricular.route";
import { TeachingRouter } from "../modules/teaching/teaching.route";
import { InstituteRouter } from "../modules/institute/institute.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: authRouter },
  { path: "/about", route: AboutRouter },
  { path: "/mission", route: MissionRouter },
  { path: "/vision", route: VisionRouter },
  { path: "/statistic", route: StatisticRouter },
  { path: "/total-employee", route: TotalEmployeeRouter },
  { path: "/file", route: FileRouter },
  { path: "/teacher", route: TeacherRouter },
  { path: "/management", route: ManagementRouter },
  { path: "/employee", route: EmployeeRouter },
  { path: "/playground", route: PlaygroundRouter },
  { path: "/mpo", route: MPORouter },
  { path: "/notice", route: NoticeRouter },
  { path: "/application", route: ApplicationRouter },
  { path: "/exam", route: ExamRouter },
  { path: "/student", route: StudentRouter },
  { path: "/cocurricular", route: CocurricularRouter },
  { path: "/teaching", route: TeachingRouter },
  { path: "/institute", route: InstituteRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
