import type { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user._id.toString());
    return res.status(200).json({
      message: "User registered",
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Error Registering..." });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
  } catch (err) {
    return res.status(500).json({ message: "Error Loggin..." });
  }
};


export const login = async(req:Request,res:Response)=>{
    try{

    }catch(err){
        return res.status(500).json({message : "Server Error"});
    }
}