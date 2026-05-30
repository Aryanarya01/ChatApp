import type { Document } from "mongoose";
import mongoose from "mongoose";

interface IConversation extends Document{
    participants : mongoose.Schema.Types.ObjectId[]
}

const consversationSchema = new mongoose.Schema({
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        }
    ]
},{
    timestamps : true
})

const 