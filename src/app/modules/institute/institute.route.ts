import { Router } from "express";
import { InstituteController } from "./institute.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/", InstituteController.getInstitute);
router.patch(
  "/",
  auth(USER_ROLE_ENUM.ADMIN),
  InstituteController.updateInstitute,
);

export const InstituteRouter = router;
