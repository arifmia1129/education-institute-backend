import { Router } from "express";
import { MPOController } from "./mpo.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/:ln", MPOController.getMPO);
router.patch("/", auth(USER_ROLE_ENUM.ADMIN), MPOController.updateMPO);

export const MPORouter = router;
