import { Router } from "express";
import { PlaygroundController } from "./playground.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/:ln", PlaygroundController.getPlayground);
router.patch(
  "/",
  auth(USER_ROLE_ENUM.ADMIN),
  PlaygroundController.updatePlayground,
);

export const PlaygroundRouter = router;
