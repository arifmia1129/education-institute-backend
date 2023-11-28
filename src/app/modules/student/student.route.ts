import { Router } from "express";
import { StudentController } from "./student.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/", StudentController.getStudent);
router.patch("/", auth(USER_ROLE_ENUM.ADMIN), StudentController.updateStudent);

export const StudentRouter = router;
