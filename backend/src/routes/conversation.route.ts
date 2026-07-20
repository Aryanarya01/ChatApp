import { Router } from "express";
import Protect from "../middleware/protect.js";
import {
  createConversation,
  createGroup,
  getConversation,
  getUserConversations,
} from "../controllers/conversation.controller.js";

const router = Router();

router.route("/create").post(Protect, createConversation);
router.route("/").get(Protect, getUserConversations);
router.route("/:id").get(Protect, getConversation);
router.route("/group").post(Protect, createGroup);

export default router;
