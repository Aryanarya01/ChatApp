"use client";
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
    if (!selectedConversation || !content.trim()) return;
    try {
      const { data } = await clientServer.post("/messages", {
        conversationId: selectedConversation._id,
        content,
      });
      setMessage((prev) => [...prev, data]);
      console.log(data);
      setContent("");
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
      <div className="w-1/4 border-r p-4">
        <h2 className="text-xl font-bold mb-4">Chat page..</h2>

        {conversation.map((conv: any) => {
          const otherUser = conv.participants.find(
            (p: any) => p._id !== me?._id,
          );
          return (
            <div
              key={conv._id}
              className={`p-3 cursor-pointer ${selectedConversation?._id === conv._id ? "bg-gray-300" : "hover:bg-gray-100"}`}
            >
              <div
                onClick={() => {
                  setSelectedConversation(conv);
                  setSelectedUser(otherUser);
                }}
                className="flex justify-between items-center"
              >
                <h4>{otherUser.name}</h4>
                  <p className="text-sm text-gray-500">
                {conv.lastMessage?.content || "No messages"}
              </p>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                {onlineUsers.includes(otherUser._id) && <span>🟢</span>}
                {conv.unreadCount > 0 && (
                  <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* right side */}
      <div className="flex flex-col flex-1">
        {selectedUser ? (
          <>
            <div className="border-b p-4">
              <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
              {isTyping && <p className="text-sm text-gray-500">Typing...</p>}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-3 w-full">
                {message.map((mess: any) => (
                  <div
                    key={mess._id}
                    className={`max-w-[70%] p-3 rounded-lg ${
                      mess.sender?._id === me?._id
                        ? "self-end bg-blue-500 text-white"
                        : "self-start bg-gray-200 text-black"
                    }`}
                  >
                    <p>{mess.content}</p>
                    <p className="text-xs mt-1">
                      {new Date(mess.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                    {mess.sender?._id === me?._id && (
                      <p className="text-xs">
                        {mess.seen ? "Seen" : "Delivered"}
                      </p>
                    )}
                  </div>
                ))}
                <div ref={messageEndRef}></div>
              </div>
            </div>

            <div className="border-t p-4 flex gap-2">
              <input
                className="flex-1 border rounded p-2"
                placeholder="Type message..."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  socket.emit("typing", selectedConversation._id);
                  if (typingTimeout.current) {
                    clearTimeout(typingTimeout.current);
                  }
                  typingTimeout.current = setTimeout(() => {
                    socket.emit("stopTyping", selectedConversation._id);
                  }, 1000);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handelSendMessage();
                  }
                }}
              />
              <button
                className="bg-blue-500 text-white px-4 rounded"
                onClick={handelSendMessage}
              >
                Send
              </button>
            </div>
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
