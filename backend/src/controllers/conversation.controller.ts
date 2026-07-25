import type { Request, Response } from "express";
import Conversation from "../models/conversation.model.js";
import type { AuthRequest } from "../middleware/protect.js";
import Message from "../models/message.model.js";

export const createConversation = async (req: AuthRequest, res: Response) => {
  try {
    const { recieverId } = req.body;
    const existingConversation = await Conversation.findOne({
      participants: {
        $all: [req.user!._id, recieverId],
      },
    });
    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }
    const conversation = await Conversation.create({
      participants: [req.user!._id, recieverId],
    });

    return res.status(201).json(conversation);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getUserConversations = async (req: AuthRequest, res: Response) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user!._id,
    })
      .populate("participants", "name username email profilePicture")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    const updatedConversations = await Promise.all(
      conversations.map(async (conv: any) => {
        const unreadCount = await Message.countDocuments({
          conversation: conv._id,
          sender: { $ne: req.user!._id },
          seen: false,
        });
        return {
          ...conv.toObject(),
          unreadCount,
        };
      }),
    );

    return res.status(200).json(updatedConversations);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getConversation = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findById(id).populate(
      "participants",
      "name username email profilePicture",
    );
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    return res.status(200).json(conversation);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const createGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { groupName, participants } = req.body;
    if (!groupName) {
      return res.status(400).json({ message: "Group name is required!" });
    }
    if (!participants || participants.length < 2) {
      return res
        .status(400)
        .json({ message: "At least 3 members are required including you!" });
    }
    // add logged in user
    participants.push(req.user!._id);

    //create group
    const group = await Conversation.create({
      participants,
      isGroup: true,
      groupName,
      groupAdmin: req.user!._id,
    });

    //populate data
    const populatedGroup = await Conversation.findById(group._id)
      .populate("participants", "name username email profilePicture")
      .populate("groupAdmin", "name username profilePicture");

    return res.status(201).json(populatedGroup);
  } catch (err) {
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const addMemberToGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId, userId } = req.body;
    const group = await Conversation.findById(conversationId);
    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }
    if (group.groupAdmin.toString() !== req.user!._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only group admin can add members" });
    }
    const alreadyMember = group.participants.includes(userId);
    if (alreadyMember) {
      return res.status(400).json({ message: "User already in the group!" });
    }
    group.participants.push(userId);
    await group.save();
    const updatedGroup = await Conversation.findById(group._id)
      .populate("participants", "name username profilePicture")
      .populate("groupAdmin", "name username profilePicture");
    return res.status(200).json(updatedGroup);
  } catch (err) {
    return res.status(500).json({ message: "Server error!" });
  }
};

export const removeMemberFromGroup = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { conversationId, userId } = req.body;
    const group = await Conversation.findById(conversationId);
    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }
    if (group.groupAdmin.toString() !== req.user!._id.toString()) {
      return res
        .status(403)
        .json({ message: "only group admin can remove members!" });
    }
    const isMember = group.participants.includes(userId);
    if (!isMember) {
      return res.status(404).json({ message: "User is not in the group!" });
    }
    group.participants = group.participants.filter(
      (id) => id.toString() !== userId,
    );
    if (userId === req.user!._id.toString()) {
      return res.status(400).json({ message: "Admin cannot remove himself" });
    }
    await group.save();
    const updatedGroup = await Conversation.findById(group._id)
      .populate("participants", "name username profilePicture")
      .populate("groupAdmin", "name username profilePicture");
    return res.status(200).json(updatedGroup);
  } catch (err) {
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const leaveGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.body;
    const group = await Conversation.findById(conversationId);
    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }
    if (group.groupAdmin.toString() === req.user!._id.toString()) {
      return res.status(403).json({ message: "Admin cannot leave the group!" });
    }
    group.participants = group.participants.filter(
      (id) => id.toString() !== req.user!._id.toString(),
    );
    await group.save();
    return res.status(200).json({ message: "You left the groupsuccessfully!" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const renameGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId, groupName } = req.body;
    if (!groupName) {
      return res.status(400).json({ message: "GroupName is required!" });
    }
    const group = await Conversation.findById(conversationId);
    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }
    if (group.groupAdmin.toString() !== req.user!._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only group Admin can rename the group!" });
    }
    group.groupName = groupName;
    await group.save();
    const updatedGroup = await Conversation.findById(group._id)
      .populate("participants", "name username profilePicture")
      .populate("groupAdmin", "name username profilePicture");
  } catch (err) {
    return res.status(500).json({ message: "Server Error!" });
  }
};
