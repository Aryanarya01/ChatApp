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
    <div className="min-h-screen flex items-center justify-center bg-[#071320] relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -bottom-20 -right-20"></div>
      <form className="relative z-10 w-[420px] rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]" onSubmit={handelSubmit}>

      {/* title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">ZenChat</h1>
        <p className="text-slate-400 mt-2">Create your account</p>
      </div>
      {/* name */}
      <div className="mb-4">
        <label className="text-sm text-slate-300">Name</label>
        <input type="text" name="name" onChange={handelChange} className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition" />
      </div>
      {/* username */}
      <div className="mb-4">
        <label className="text-sm text-slate-300">Username</label>
        <input type="text" name="username" onChange={handelChange} className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition" />
      </div>
      {/* email*/}
      <div className="mb-4">
        <label className="text-sm text-slate-300">Email</label>
        <input type="email" name="email" onChange={handelChange} className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition" />
      </div>
      {/* password */}
      <div className="mb-6">
        <label className="text-sm text-slate-300">Password</label>
        <input type="password" name="password" onChange={handelChange} className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition" />
      </div>
      <button type="submit" className="">Create Account</button>
      </form>

    </div>
   )
};

export default page;
