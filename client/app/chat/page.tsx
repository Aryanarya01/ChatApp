"use client";
import clientServer from "@/lib/axios";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [message, setMessage] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [onlineUsers, setonlineUsers] = useState<string[]>([]);

  const getMe = async () => {
    try {
      const { data } = await clientServer.get("/auth/me");
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

  const handelSendMessage = async () => {
    if (!selectedConversation || !content.trim()) return;
    try {
      const { data } = await clientServer.post("/messages", {
        conversationId: selectedConversation._id,
        content,
      });
      setMessage((prev) => [...prev, data]);
      setContent("");
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
    const fetchMessages = async () => {
      if (!selectedConversation) return;
      try {
        const { data } = await clientServer.get(
          `/messages/${selectedConversation._id}`,
        );
        setMessage(data);
      } catch (err: any) {
        console.log(err.response?.data);
      }
    };
    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    getMe();
    fetchUsers();
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
      } catch (err) {
        console.log(err);
      }
    };
    connectSockets();
    return () => {
      socket.off("newMessage");
      socket.off("onlineUsers");
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <h2>Chat page</h2>
      <div>
        {users.map((user: any) => (
          <div key={user._id}>
            {onlineUsers.includes(user._id) && (
                 <span>🟢</span>
            )}
            <h4 onClick={() => handelUserClick(user)}>{user.name}</h4>
          </div>
        ))}
      </div>
      <div>
        {selectedUser ? (
          <>
            <h3>{selectedUser.name}</h3>
            {message.map((mess: any) => (
              <p key={mess._id}>{mess.content}</p>
            ))}

            <input
              placeholder="Type message...."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handelSendMessage}>Send</button>
          </>
        ) : (
          <>
            <p>Select a user</p>

            <div>
              {message.map((mess: any) => (
                <p key={mess._id}>{mess.content}</p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
