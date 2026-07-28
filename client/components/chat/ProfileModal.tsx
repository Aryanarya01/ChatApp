import React from 'react'

interface ProfileModalProps {
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
  me : any
}

const ProfileModal = ({me,open,setOpen}:ProfileModalProps) => {
  if(!open) return null;
  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
      <div className='bg-white p-5 rounded w-96'>
        <h2>My Profile</h2>
        <img src={me?.profilePicture || "/avatar.png"}  alt="Profile" className='w-24 h-24 rounded-full object-cover mx-auto' />
        <h3>{me?.name}</h3>
        <p>{me?.email}</p>
        <button onClick={()=>setOpen(false)}>Close</button>
      </div>
    </div>
  )
}

export default ProfileModal