import type { Request, Response } from "express";

import jwt from "jsonwebtoken"
interface JwtPayload {
     id:string,
}
export interface AuthRequest extends Request{
    user?: any,
}

const Protect = async(req:AuthRequest,res:Response)=>{
    try{
            const token = req.cookies.token;
            if(!token){
                return res.status(401).json({message : "Not Authorized"})
            }
            const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;
            const 
            if()
    }catch(err){
        return res.status(401).json({message : "Invalid Token"})
    }
}