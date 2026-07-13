import { Router } from "express";
import Protect from "../middleware/protect.js";
import {
  getMessage,
  markAsSeen,
  sendMessage,
} from "../controllers/message.controller.js";
import upload from "../middleware/upload.js";

const router = Router();

router.route("/").post(Protect,upload.single("image"),sendMessage);
router.route("/:conversationId").get(Protect, getMessage);
router.route("/seen/:conversationId").patch(Protect, markAsSeen);
export default router;
