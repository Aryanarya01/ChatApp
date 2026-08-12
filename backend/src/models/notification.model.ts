import mongoose from "mongoose";



const notificationSchema = new mongoose.Schema({
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    conversation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Conversation",
        required : true,
    },
    message : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message",
        required : true,
    },
    type : {
        type : String,
        enum : ["message"],
        default : "message",
    },
    read : {
        type : Boolean,
        default : false,
    },
},{
    timestamps : true,
});


const Notification = mongoose.model("Notification",notificationSchema);
export default Notification;