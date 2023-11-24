import { Router } from "express";
import { AboutController } from "./about.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/:ln", AboutController.getAbout);
router.patch("/", auth(USER_ROLE_ENUM.ADMIN), AboutController.updateAbout);

export const AboutRouter = router;
