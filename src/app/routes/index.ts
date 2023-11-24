import { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import { AboutRouter } from "../modules/about/about.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: authRouter },
  { path: "/about", route: AboutRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
