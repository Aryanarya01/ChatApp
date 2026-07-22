import type { Response } from "express";
import type { AuthRequest } from "../middleware/protect.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { onlineUser } from "../sockets/socketHandler.js";
import { getIO } from "../sockets/sockets.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId, content } = req.body;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    let image = "";
    let messageType: "text" | "image" = "text";
    if (req.file) {
      image = req.file.path;
      messageType = "image";
    }

    if (!content && !req.file) {
      return res.status(400).json({
        message: "Message or image is required",
      });
    }
    const message = await Message.create({
      sender: req.user!._id,
      conversation: conversationId,
      content,
      image,
      messageType,
    });
    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "name username profilePicture",
    );
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
    });

    const io = getIO();
   for(const participant of conversation.participants){
    if(participant.toString() === req.user!._id.toString()){
      continue;
    }
    const sockteId = onlineUser.get(participant.toString());
    if(sockteId){
      io.to(sockteId).emit("newMessage",populatedMessage)
    }
   }
    return res.status(201).json(populatedMessage);
  } catch (err: any) {
    console.log(err);
    console.log("SEND MESSAGE ERROR:");
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const message = await Message.find({
      conversation: conversationId,
    })
      .populate("sender", "name username profilePicture")
      .sort({ createdAt: 1 });
    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const markAsSeen = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    await Message.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: req.user!._id },
        seen: false,
      },
      {
        $set: {
          seen: true,
        },
      },
    );
    console.log("conversationId : ", conversationId);
    console.log("user :", req.user!._id);
    return res.status(200).json({ message: "Message marked as seen" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error!" });
  }
};
