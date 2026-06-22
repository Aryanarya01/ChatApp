"use client"
import clientServer from "@/lib/axios";
import React, { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {data} = await clientServer.post("/auth/register", formData);
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
           name="name"
          onChange={handelChange}
        />
        <br />
        <input
          type="username"
          placeholder="Enter your username"
           name="username"
          onChange={handelChange}
        />
        <br />
        <input
          type="email"
          placeholder="Enter your email"
           name="email"
          onChange={handelChange}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={handelChange}
        />
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default page;
