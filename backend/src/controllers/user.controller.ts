import type { Request, Response } from "express";
import User from "../models/user.model.js";

export const register = async(req:Request,res:Response)=>{
    try{
        const {name, username, email, password} = req.body;
        const existingUser = await User.findOne
    }catch(err){

    }
}