import type { Response } from "express";
import type { AuthRequest } from "../middleware/protect.js";
import Message from "../models/message.model.js";



export const sendMessage = async(req:AuthRequest,res:Response)=>{
    try{
        const message = await Message.create
    }catch(err){
        return res.status(500).json({message : "Server Error"})
    }
}