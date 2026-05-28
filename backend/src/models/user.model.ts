import mongoose from "mongoose";

interface IUser extends Document{
name : String,
username : String,
email : st
}

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,    
    }
})