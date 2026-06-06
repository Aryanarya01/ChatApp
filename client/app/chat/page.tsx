"use client"
import clientServer from "@/lib/axios";
import { useEffect } from "react";

const page = () => {
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
