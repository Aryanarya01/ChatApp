import React, { useState } from 'react'

const page = () => {
  const [formData, setFormData] = useState({
    name : "",
    username : "",
    email : "",
    password : ""
  })

  const handelChange = async(e:React.ChangeEvent<HTMLInputElement>)=>{
      setFormData
  }
  return (
    <div> 
      <form>
        <input type="text" placeholder='Enter your name' value={formData.name} />
        <input type="username" placeholder='Enter your username' value={formData.username} />
        <input type="email" placeholder='Enter your email' value={formData.email} />
        <input type="password" placeholder='Enter your password' value={formData.password} />
      </form>
    </div>
  )
}

export default page