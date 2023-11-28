import { Router } from "express";
import { CocurricularController } from "./cocurricular.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/", CocurricularController.getCocurricular);
router.patch(
  "/",
  auth(USER_ROLE_ENUM.ADMIN),
  CocurricularController.updateCocurricular,
);

export const CocurricularRouter = router;
