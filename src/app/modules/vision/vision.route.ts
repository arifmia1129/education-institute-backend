import { Router } from "express";
import { VisionController } from "./vision.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/:ln", VisionController.getVision);
router.patch("/", auth(USER_ROLE_ENUM.ADMIN), VisionController.updateVision);

export const VisionRouter = router;
