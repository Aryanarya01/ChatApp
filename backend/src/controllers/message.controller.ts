import type { Response } from "express";
import type { AuthRequest } from "../middleware/protect.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId, content } = req.body;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    const message = await Message.create({
      sender: req.user!._id,
      conversation: conversationId,
      content,
    });
    return res.status(201).json(message);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.body;
    const message = await Message.find({
      conversation: conversationId,
    })
      .populate("sender", "name username profilePicture")
      .sort({ createdAt: 1 });
    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
