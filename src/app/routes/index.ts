import { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import { AboutRouter } from "../modules/about/about.route";
import { FileRouter } from "../modules/file/file.route";
import { TeacherRouter } from "../modules/teacher/teacher.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: authRouter },
  { path: "/about", route: AboutRouter },
  { path: "/file", route: FileRouter },
  { path: "/teacher", route: TeacherRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
