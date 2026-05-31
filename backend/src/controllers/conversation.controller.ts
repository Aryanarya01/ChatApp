import type { Request, Response } from "express";
import Conversation from "../models/conversation.model.js";
import type { AuthRequest } from "../middleware/protect.js";

export const createConversation = async(req:AuthRequest,res:Response)=>{
    try{
        const {recieverId} = req.body;
        const existingConversation = await Conversation.findOne({
            participants : {
                $all : [ req.user!._id,recieverId]
            }
        })
        const conversation = await Conversation.create({
            participants : [

            ]
        })
    }catch(err){    
        return res.status(500).json({message : "Server Error"});
    }
}