import type { Document } from "mongoose";
import mongoose from "mongoose";


interface IMessage extends Document{
    sender : mongoose.Schema.Types.ObjectId,
    conversation : mongoose.Schema.Types.ObjectId,
    content : mongoose.Schema.Types.ObjectId,
}
const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    conversation : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "conversation",
        required : true,
    },
    content : {
        type : String,
        required : true,
        trim : true,
    },
    seen : {
        type : Boolean,
        
    }
},{
    timestamps : true,
})

const Message = mongoose.model<IMessage>("Message",messageSchema);
export default Message;