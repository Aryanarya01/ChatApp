import mongoose from "mongoose";



const notificationSchema = new mongoose.Schema({
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    
})