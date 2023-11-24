import { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import { AboutRouter } from "../modules/about/about.route";
import { FileRouter } from "../modules/file/file.route";
import { TeacherRouter } from "../modules/teacher/teacher.route";
import { ManagementRouter } from "../modules/management/management.route";
import { EmployeeRouter } from "../modules/employee/employee.route";
import { MissionRouter } from "../modules/mission/mission.route";
import { VisionRouter } from "../modules/vision/vision.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: authRouter },
  { path: "/about", route: AboutRouter },
  { path: "/mission", route: MissionRouter },
  { path: "/vision", route: VisionRouter },
  { path: "/file", route: FileRouter },
  { path: "/teacher", route: TeacherRouter },
  { path: "/management", route: ManagementRouter },
  { path: "/employee", route: EmployeeRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
