import { Router } from "express";
import { MissionController } from "./mission.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/:ln", MissionController.getMission);
router.patch("/", auth(USER_ROLE_ENUM.ADMIN), MissionController.updateMission);

export const MissionRouter = router;
