import type { Document } from "mongoose";
import mongoose from "mongoose";

interface IMessage extends Document {
  sender: mongoose.Schema.Types.ObjectId;
  conversation: mongoose.Schema.Types.ObjectId;
  content: string;
  seen: boolean;
  image: string;
  messageType: "text" | "image";
}
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    messageType: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;
