import React, { useState } from 'react'

const page = () => {
  const [formData, setFormData] = useState({
    name : "",
    username : "",
    email : "",
    password : ""
  })

  const handelChange = async(e:React.ChangeEvent<HTMLInputElement>)=>{
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      })
  }
  const handelSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    
  }
  return (
    <div> 
      <form onSubmit={handelSubmit}>
        <input type="text" placeholder='Enter your name' value={formData.name} onChange={handelChange} />
        <input type="username" placeholder='Enter your username' value={formData.username} onChange={handelChange} />
        <input type="email" placeholder='Enter your email' value={formData.email} onChange={handelChange} />
        <input type="password" placeholder='Enter your password' value={formData.password} onChange={handelChange} />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default page