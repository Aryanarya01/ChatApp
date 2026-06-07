"use client"
import clientServer from "@/lib/axios";
import { useEffect, useState } from "react";

const page = () => {
    const [users, setUsers] = useState([])
  const getMe = async () => {
    try {
      const { data } = await clientServer.get("/auth/me");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMe();
  }, []);
  return (
    <div>
      <h2>Chat page</h2>
      <div>
        {users.map((user:any)=>(
          <div key={user._id}>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
