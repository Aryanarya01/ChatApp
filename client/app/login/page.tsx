"use client";
import clientServer from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await clientServer.post("/auth/login", formData);
      router.push("/chat");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handelChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071320] relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -bottom-20 -right-20"></div>
      <form className="relative z-10 w-[420px] rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]" onSubmit={handelSubmit}>
        <div>
          <h1>ZenChat</h1>
          <p>Login your account</p>
        </div>
        {/* email */}
        <div>
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handelChange}/>
        </div>
        {/* password */}
        <div>
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" onChange={handelChange}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default page;
