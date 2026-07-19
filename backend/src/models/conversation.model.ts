import type { Document } from "mongoose";
import mongoose from "mongoose";

interface IConversation extends Document {
  participants: mongoose.Schema.Types.ObjectId[];
  lastMessage: mongoose.Schema.Types.ObjectId;
}

const consversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    isGroup : {
      type : Boolean,
      default : "",
    },
    groupName : {
      type : String,
      default : "",
    },
    
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  },
);

const Conversation = mongoose.model<IConversation>(
  "Conversation",
  consversationSchema,
);
export default Conversation;
