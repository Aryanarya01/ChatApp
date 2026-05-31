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
        });
        if(existingConversation){
            return res.status(400).json({
                message : "Conversation already exists"
            })
        }
        const conversation = await Conversation.create({
            participants : [
                req.user!._id, recieverId
            ]
        })
    }catch(err){    
        return res.status(500).json({message : "Server Error"});
    }
}


export const getUserConversations = async(req:AuthRequest,res:Response)=>{
    try{
        const conversations = await Conversation.find({
            participants : req.user!._id
        }).populate("participants","name username email profilePicture");
        return res.status(200).json(conversations)
    }catch(err){
        return res.status(500).json({
            message : "Server error"
        })
    }
}