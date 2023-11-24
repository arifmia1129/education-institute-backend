import { Router } from "express";
import { EmployeeController } from "./employee.controller";
import { FileUploadHelper } from "../../../utils/uploader";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE_ENUM.ADMIN),
  FileUploadHelper.upload.single("image"),
  EmployeeController.createEmployee,
);
router.get("/", EmployeeController.getEmployee);

router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .get(EmployeeController.getEmployeeById)
  .patch(EmployeeController.updateEmployeeById)
  .delete(EmployeeController.deleteEmployeeById);

export const EmployeeRouter = router;
