import type { Document } from "mongoose";
import mongoose from "mongoose";

interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  isGroup: boolean;
  groupName: string;
  groupImage: string;
  groupAdmin: mongoose.Types.ObjectId;
  lastMessage: mongoose.Types.ObjectId;
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
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      default: "",
    },
    groupImage: {
      type: String,
      default: "",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
