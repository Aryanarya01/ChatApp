"use client"
import clientServer from "@/lib/axios";
import React, { ChangeEvent, useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await clientServer.post("/auth/login", formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handelChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input
          type="email"
          placeholder="example : xyz@gmail.com"
       
          onChange={handelChange}
        />
        <input
          type="password"
          placeholder="*********"
         
          onChange={handelChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default page;
