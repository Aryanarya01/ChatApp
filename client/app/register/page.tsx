import React, { useState } from 'react'

const page = () => {
  const [formData, setFormData] = useState({
    name : "",
    username : "",
    email : "",
    password : ""
  })
  return (
    <div> 
      <form>
        <input type="text" placeholder='Enter your name' value={} />
        <input type="username" placeholder='Enter your username' value={} />
        <input type="email" placeholder='Enter your email' value={} />
        <input type="password" placeholder='Enter your password' value={} />
      </form>
    </div>
  )
}

export default page