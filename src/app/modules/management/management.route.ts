import { Router } from "express";
import { ManagementController } from "./management.controller";
import { FileUploadHelper } from "../../../utils/uploader";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE_ENUM.ADMIN),
  FileUploadHelper.upload.single("image"),
  ManagementController.createManagement,
);
router.get("/", ManagementController.getManagement);

router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .get(ManagementController.getManagementById)
  .patch(ManagementController.updateManagementById)
  .delete(ManagementController.deleteManagementById);

export const ManagementRouter = router;
