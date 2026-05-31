import type { Request, Response } from "express";
import Conversation from "../models/conversation.model.js";

export const createConversation = async(req:Request,res:Response)=>{
    try{
        const {recieverId} = req.body;
        const existingConversation = await Conversation.findOne({
            p
        })
        const conversation = await Conversation.create({
            participants : [

            ]
        })
    }catch(err){    
        return res.status(500).json({message : "Server Error"});
    }
}