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
        const user = await User.create({
            name,
            username,
            email,
            password : hashedPassword
        });

        return res.status(200).json({message : "User registered",
            user
        })

        
    }catch(err){

    }
}