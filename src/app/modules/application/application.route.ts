import { Router } from "express";
import { ApplicationController } from "./application.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE_ENUM.ADMIN),
  ApplicationController.createApplication,
);
router.get("/:ln", ApplicationController.getApplication);

router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .get(ApplicationController.getApplicationById)
  .patch(ApplicationController.updateApplicationById)
  .delete(ApplicationController.deleteApplicationById);

export const ApplicationRouter = router;
