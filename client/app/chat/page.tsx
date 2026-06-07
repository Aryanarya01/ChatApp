"use client"
import clientServer from "@/lib/axios";
import { useEffect, useState } from "react";

const page = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedConversation, setSelectedConversation] = useState<any>(null);
    const [message, setMessage] = useState<any[]>([])
  const getMe = async () => {
    try {
      const { data } = await clientServer.get("/auth/me");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUsers = async()=>{
    try{  
      const {data} = await clientServer.get("/auth/users");
      setUsers(data)
    }catch(err:any){
      console.log(err)
    }
  }


  const handelUserClick = async(user : any)=>{
    try{
      const {data} = await clientServer.post("/conversation/create",{
        recieverId :user._id,
      });
      setSelectedUser(user);
      setSelectedConversation(data)
      console.log(data)
    }catch(err:any){
       console.log(err.response?.data);
    }
  }

useEffect(()=>{
  const fetchMessages = async()=>{
    if(!selectedConversation) return;
    try{

    }catch(err : any){
      console.log(err.response?.data)
    }
  }
  fetchMessages()
},[selectedConversation])
  useEffect(() => {
    getMe();
      fetchUsers();
  }, []);
  return (
    <div>
      <h2>Chat page</h2>
      <div>
        {users.map((user:any)=>(
          <div key={user._id}>
            <h4 onClick={()=>handelUserClick(user)}>{user.name}</h4>
          </div>
        ))}
      </div>
      <div>
        {selectedUser ? (
          <p>{selectedUser.name}</p>
        ) : (
          <p>Select a user</p>
        )}
      </div>
    </div>
  );
};

export default page;
