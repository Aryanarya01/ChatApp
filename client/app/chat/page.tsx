"use client";
import ChatHeader from "@/components/chat/ChatHeader";
import CreateGroupModal from "@/components/chat/CreateGroupModal";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
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
    console.log("clicked")
    if (!selectedConversation || !content.trim() && !image) return;
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

        await clientServer.patch(`messages/seen/${selectedConversation._id}`);
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        conversation={conversation}
        me={me}
        onlineUsers={onlineUsers}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        setSelectedUser={setSelectedUser}
        openGroupModal = {openGroupModal}
        setOpenGroupModal = {setOpenGroupModal}
      />
      {openGroupModal && (
        <CreateGroupModal/>
      )}

      {/* right side */}
      <div className="flex flex-col flex-1">
        {selectedUser ? (
          <>
            {/* chatHeader */}
            <ChatHeader selectedUser={selectedUser} isTyping={isTyping} />

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
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <h2 className="text-gray-500 text-xl">
              Select a user to start chatting
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
