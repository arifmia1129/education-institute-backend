import { Router } from "express";
import { TotalEmployeeController } from "./totalEmployee.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/", TotalEmployeeController.getTotalEmployee);
router.patch(
  "/",
  auth(USER_ROLE_ENUM.ADMIN),
  TotalEmployeeController.updateTotalEmployee,
);

export const TotalEmployeeRouter = router;
