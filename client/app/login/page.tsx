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
      <div className="relative z-10 w-[420px] rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
        <form onSubmit={handelSubmit}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">ZenChat</h1>
            <p className="text-slate-400 mt-2">Login your account</p>
          </div>
          {/* email */}
          <div className="mb-4">
            <label className="text-sm text-slate-300">Email</label>
            <input
              className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handelChange}
            />
          </div>
          {/* password */}
          <div className="mb-6">
            <label className="text-sm text-slate-300">Password</label>
            <input
              className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handelChange}
            />
          </div>
          <button
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 py-3 text-white font-semibold hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            type="submit"
          >
            Login
          </button>
        </form>
         <div>
          <p>Don't Have an Account?<span>Sign Up</span></p>
        </div>
      </div>
    </div>
  );
};

export default page;
