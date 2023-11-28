import { Router } from "express";
import { TeachingController } from "./teaching.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE_ENUM.ADMIN),
  TeachingController.createTeaching,
);
router.get("/:ln", TeachingController.getTeaching);

router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .get(TeachingController.getTeachingById)
  .patch(TeachingController.updateTeachingById)
  .delete(TeachingController.deleteTeachingById);

export const TeachingRouter = router;
