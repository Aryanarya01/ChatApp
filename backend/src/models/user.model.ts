import mongoose from "mongoose";

interface IUser extends Document{
name : string,
username : string,
email : string,
password : string,
profilePicture : string
}

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,    
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    }
})