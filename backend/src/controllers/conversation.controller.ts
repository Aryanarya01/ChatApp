import type { Request, Response } from "express";
import Conversation from "../models/conversation.model.js";

export const createConversation = async(req:Request,res:Response)=>{
    try{
        const conversation = await Conversation.crea
    }catch(err){    
        return res.status(500).json({message : "Server Error"});
    }
}