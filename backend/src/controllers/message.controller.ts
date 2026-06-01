import type { Response } from "express";
import type { AuthRequest } from "../middleware/protect.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";



export const sendMessage = async(req:AuthRequest,res:Response)=>{
    try{
        const {conversationId, content} = req.body;
        const conversation = await Conversation.findById(conversationId);
        if
    }catch(err){
        return res.status(500).json({message : "Server Error"})
    }
}