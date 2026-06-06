import clientServer from "@/lib/axios";
import React, { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    email : "",
    password : "",
  })
  const handelSubmit = async(e:React.FormEvent)=>{
      e.preventDefault();
      try{
        const {data} = await clientServer.post("/register")
      }catch(err){
        console.log(err)
      }
  }
  return (
    <div>
      <form>
        <input type="email" placeholder="example : xyz@gmail.com" value={formData.email} />
        <input type="password" placeholder="*********" value={formData.password} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default page;
