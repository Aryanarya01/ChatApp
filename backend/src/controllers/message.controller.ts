import type { Response } from "express";
import type { AuthRequest } from "../middleware/protect.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { onlineUser } from "../sockets/socketHandler.js";
import { getIO } from "../sockets/sockets.js";
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
    const populatedMessage = await
    await Conversation.findByIdAndUpdate(conversationId,{
      lastMessage : message._id
    })
    const io = getIO();
    const recieverId = conversation.participants.find(
      (id) => id.toString() !== req.user!._id.toString(),
    );
    if (!recieverId) {
      return res.status(404).json({ message: "Reciever not found" });
    }
    const recieverSocketId = onlineUser.get(recieverId.toString());
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", message);
    }
    return res.status(201).json(message);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const message = await Message.find({
      conversation : conversationId,
    })
      .populate("sender", "name username profilePicture")
      .sort({ createdAt: 1 });
    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error!" });
  }
};


export const markAsSeen = async(req:AuthRequest, res:Response)=>{
  try{
    const {conversationId} = req.params;
    await Message.updateMany(
      {
        conversation : conversationId,
        sender : {$ne : req.user!._id},
        seen : false,
      },{ $set :{
        seen : true,
      }}
    ); console.log("conversationId : ", conversationId);
    console.log("user :",req.user!._id)
    return res.status(200).json({message : "Message marked as seen"});
    
  }catch(err){
    console.log(err);
    return res.status(500).json({message : "Server Error!"})
  }
}