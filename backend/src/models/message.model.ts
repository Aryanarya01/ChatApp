import type { Document } from "mongoose";
import mongoose from "mongoose";

interface IMessage extends Document{
    sender : mongoose.Schema.Types.ObjectId,
    conversation : mongoose.Schema.Types.ObjectId,
    content : mongoose.Schema.Types.ObjectId,
}
const messageSchema = new mongoose.Schema({

})