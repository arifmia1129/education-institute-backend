import { Router } from "express";
import { StatisticController } from "./statistic.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/", StatisticController.getStatistic);
router.patch(
  "/",
  auth(USER_ROLE_ENUM.ADMIN),
  StatisticController.updateStatistic,
);

export const StatisticRouter = router;
