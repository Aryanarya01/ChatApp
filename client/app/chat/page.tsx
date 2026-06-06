"use client"
import clientServer from "@/lib/axios";
import { useEffect, useState } from "react";

const page = () => {
    const [users, setUsers] = useState()
  const getMe = async () => {
    try {
      const { data } = await clientServer.get("/me");
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
    </div>
  );
};

export default page;
