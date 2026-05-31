import { Router } from "express";
import Protect from "../middleware/protect.js";
import {
  createConversation,
  getConversation,
  getUserConversations,
} from "../controllers/conversation.controller.js";

const router = Router();

router.route("/create").post(Protect, createConversation);
router.route("/").get(Protect, getUserConversations);
router.route("/:id").get(Protect, getConversation);

export default router;
