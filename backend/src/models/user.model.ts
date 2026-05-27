import mongoose from "mongoose";

interface IUser extends Document

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,    
    }
})