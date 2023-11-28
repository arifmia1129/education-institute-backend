import { Router } from "express";
import { NoticeController } from "./notice.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE_ENUM.ADMIN),
  NoticeController.createNotice,
);
router.get("/:ln", NoticeController.getNotice);

router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .get(NoticeController.getNoticeById)
  .patch(NoticeController.updateNoticeById)
  .delete(NoticeController.deleteNoticeById);

export const NoticeRouter = router;
