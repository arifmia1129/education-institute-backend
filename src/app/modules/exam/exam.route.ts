import { Router } from "express";
import { ExamController } from "./exam.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post("/create", auth(USER_ROLE_ENUM.ADMIN), ExamController.createExam);
router.get("/:ln", ExamController.getExam);

router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .get(ExamController.getExamById)
  .patch(ExamController.updateExamById)
  .delete(ExamController.deleteExamById);

export const ExamRouter = router;
