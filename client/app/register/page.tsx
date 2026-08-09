"use client";
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
      const { data } = await clientServer.post("/auth/register", formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
   return(
    <div>
      <div></div>
      <div></div>
      <form onSubmit={handelSubmit}>

      {/* title */}
      <div>
        <h1>ZenChat</h1>
        <p>Create your account</p>
      </div>
      {/* name */}
      <div>
        <label htmlFor="">Name</label>
        <input type="text" />
      </div>
      {/* username */}
      <div>
        <label htmlFor="">Username</label>
        <input type="text" name="" id="" />
      </div>
      {/* email*/}
      <div>
        <label htmlFor="">Email</label>
        <input type="text" />
      </div>
      {/* password */}
      <div>
        <label htmlFor="">Password</label>
        <input type="text" name="" id="" />
      </div>
      <button>Create Account</button>
      </form>

    </div>
   )
};

export default page;
