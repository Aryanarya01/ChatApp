import type { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async(req:Request,res:Response)=>{
    try{
        const {name, username, email, password} = req.body;
        const existingUser = await User.findOne({
            $or: [{email},{username}]
        })
        if(existingUser){
            return res.status(400).json({message : "User already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = User.create({
            name,
            username,
            email,
            password : hashedPassword
        })
    }catch(err){

    }
}