"use client";
import ChatHeader from "@/components/chat/ChatHeader";
import CreateGroupModal from "@/components/chat/CreateGroupModal";
import GroupInfoModal from "@/components/chat/GroupInfoModal";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import ProfileModal from "@/components/chat/ProfileModal";
import Sidebar from "@/components/chat/Sidebar";
import clientServer from "@/lib/axios";
import { socket } from "@/lib/socket";
import { useEffect, useRef, useState } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [message, setMessage] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [onlineUsers, setonlineUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [image, setImage] = useState<File | null>(null);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [openGroupInfo, setOpenGroupInfo] = useState(false);
  const [openProfileModel, setOpenProfileModel] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const getMe = async () => {
    try {
      const { data } = await clientServer.get("/auth/me");
      setMe(data.user);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUsers = async () => {
    try {
      const { data } = await clientServer.get("/auth/users");
      setUsers(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const fetchConversations = async () => {
    const { data } = await clientServer.get("/conversation");
    setConversation(data);
  };
  const handelSendMessage = async () => {
    console.log("clicked");
    if (!selectedConversation || (!content.trim() && !image)) return;
    try {
      const formData = new FormData();
      formData.append("conversationId", selectedConversation._id);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }
      const { data } = await clientServer.post("/messages", formData);
      setMessage((prev) => [...prev, data]);
      console.log(data);
      setContent("");
      setImage(null);
      socket.emit("stopTyping", selectedConversation._id);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handelUserClick = async (user: any) => {
    try {
      const { data } = await clientServer.post("/conversation/create", {
        recieverId: user._id,
      });

      setSelectedUser(user);
      setSelectedConversation(data);
      console.log(data);
    } catch (err: any) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;

      socket.emit("joinConversation", selectedConversation._id);

      try {
        const { data } = await clientServer.get(
          `/messages/${selectedConversation._id}`,
        );
        setMessage(data);

        await clientServer.patch(`/messages/seen/${selectedConversation._id}`);
      } catch (err: any) {
        console.log(err.response?.data);
      }
    };
    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    getMe();
    fetchUsers();
    fetchConversations();
  }, []);
  useEffect(() => {
    const connectSockets = async () => {
      try {
        const { data } = await clientServer.get("/auth/me");
        socket.connect();
        socket.emit("setup", data.user._id);
        socket.on("newMessage", (newMessage) => {
          setMessage((prev) => [...prev, newMessage]);
        });
        socket.on("onlineUsers", (users) => {
          setonlineUsers(users);
        });
        socket.on("typing", () => {
          setIsTyping(true);
        });
        socket.on("stopTyping", () => {
          setIsTyping(false);
        });
      } catch (err) {
        console.log(err);
      }
    };
    connectSockets();
    return () => {
      socket.off("newMessage");
      socket.off("onlineUsers");
      socket.off("typing");
      socket.off("stopTyping");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#071320] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        conversation={conversation}
        me={me}
        onlineUsers={onlineUsers}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        setSelectedUser={setSelectedUser}
        openGroupModal={openGroupModal}
        setOpenGroupModal={setOpenGroupModal}
        openProfileModel={openProfileModel}
        setOpenProfileModel={setOpenProfileModel}
      />
      {openGroupModal && (
        <CreateGroupModal
          users={users}
          setOpenGroupModal={setOpenGroupModal}
          fetchConversations={fetchConversations}
        />
      )}

      {/* right side */}
      <div className="flex flex-col flex-1 relative bg-[url('/ocean.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071320]/45 via-[#071320]/60 to-[#071320]/80"></div>
        <div className="relative flex flex-col flex-1 z-10">
          {selectedConversation ? (
            <>
              {/* chatHeader */}
              <ChatHeader
                selectedUser={selectedUser}
                isTyping={isTyping}
                selectedConversation={selectedConversation}
                setOpenGroupInfo={setOpenGroupInfo}
              />

              {/* message List */}
              <MessageList
                message={message}
                me={me}
                messageEndRef={messageEndRef}
              />

              {/* messageInput */}
              <MessageInput
                content={content}
                setContent={setContent}
                selectedConversation={selectedConversation}
                typingTimeout={typingTimeout}
                socket={socket}
                handelSendMessage={handelSendMessage}
                setImage={setImage}
                image={image}
              />
              <GroupInfoModal
                me={me}
                selectedConversation={selectedConversation}
                open={openGroupInfo}
                setOpen={setOpenGroupInfo}
                fetchConversations={fetchConversations}
                users={users}
                setSelectedConversation={setSelectedConversation}
                setSelectedUser={setSelectedUser}
              />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <h2 className="text-2xl text-slate-300 font-medium">
                🌊 Select a conversation to start chatting
              </h2>
            </div>
          )}
          {openProfileModel && (
            <ProfileModal
              open={openProfileModel}
              setOpen={setOpenProfileModel}
              me={me}
              setMe={setMe}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
