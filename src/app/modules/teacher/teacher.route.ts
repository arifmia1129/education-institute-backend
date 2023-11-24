import { Router } from "express";
import { TeacherController } from "./teacher.controller";
import { FileUploadHelper } from "../../../utils/uploader";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE_ENUM.ADMIN),
  FileUploadHelper.upload.single("image"),
  TeacherController.createTeacher,
);
router.get("/", TeacherController.getTeacher);

router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .get(TeacherController.getTeacherById)
  .patch(TeacherController.updateTeacherById)
  .delete(TeacherController.deleteTeacherById);

export const TeacherRouter = router;
