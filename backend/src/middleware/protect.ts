import type { Request, Response } from "express";



export interface AuthRequest extends Request{
    user?: any,
}

const Protect = async(req:AuthRequest,res:Response)=>{
    try{
        const 
    }catch(err){
        return res.status(401).json({message : "Invalid Token"})
    }
}