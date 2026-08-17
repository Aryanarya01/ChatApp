import mongoose, { Document } from "mongoose";

interface INotification extends Document {
  reciever: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  conversation: mongoose.Types.ObjectId;
  message: mongoose.Types.ObjectId;
  type: "message";
  read: boolean;
}

const notificationSchema = new mongoose.Schema(
  {
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },
    type: {
      type: String,
      enum: ["message"],
      default: "message",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);
export default Notification;
