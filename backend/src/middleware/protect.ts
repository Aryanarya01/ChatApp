import type { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
interface JwtPayload {
     id:string,
}
export interface AuthRequest extends Request{
    user?: any,
}

const Protect = async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
            const token = req.cookies.token;
            if(!token){
                return res.status(401).json({message : "Not Authorized"})
            }
            const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;
            const user = await User.findById(decoded.id).select("-password");
            if(!user){
                return res.status(401).json({message :"User not found"})
            }
            req.user = user;
            next();
            
    }catch(err){
        return res.status(401).json({message : "Invalid Token"})
    }
}