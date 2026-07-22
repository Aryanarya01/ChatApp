import { Router } from "express";
import Protect from "../middleware/protect.js";
import {
  addMemberToGroup,
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
router.route("/group/add-member").patch(Protect,addMemberToGroup);

export default router;
