"use client";
import clientServer from "@/lib/axios";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState<any>(null);
  const [conversation, setConversation] = useState([])
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [message, setMessage] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [onlineUsers, setonlineUsers] = useState<string[]>([]);

  const getMe = async () => {
    try {
      const { data } = await clientServer.get("/auth/me");
      console.log(data);
         setMe(data.user);
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
  const fetchConversation = async()=>{
    try{
      const {data} = await clientServer.get("/conversation");
      console.log(data)
      setConversation(data)
    }catch(err:any){
      console.log(err)
    }
  }
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
const handleConversationClick = (conv: any) => {
  const otherUser = conv.participants.find((p:any)=>p._id !== me._id)
  setSelectedUser(otherUser)
  setSelectedConversation(conv);
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
   fetchConversation()
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
      <h2>Chat page..</h2>
      <div>
        {conversation.map((conv: any) => {
  const otherUser = conv.participants.find(
    (p: any) => p._id !== me?._id
  );

  return (
    <div key={conv._id}>
      <h4 onClick={() => handleConversationClick(conv)}>{otherUser?.name}</h4>
      <p>{conv.lastMessage?.content || "No messages yet"}</p>
    </div>
  );
})}
      </div>
      <div>
        {selectedUser ? (
          <>
            <h3>{selectedUser.name}</h3>
            {message.map((mess: any) => (
              <p key={mess._id}>{mess.content}</p>
            ))}

            <input
              placeholder="Type message..."
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
