"use client"
import clientServer from "@/lib/axios";
import { useEffect, useState } from "react";

const page = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
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


  const handelClick = ()=>{
    try{
      const {data} = await clientServer.get("/")
    }catch(err:any){
      console.log(err)
    }
  }


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
            <p onClick={()=>setSelectedUser(user)}>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
