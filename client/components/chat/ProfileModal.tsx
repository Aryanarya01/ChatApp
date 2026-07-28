import React from 'react'

interface ProfileModalProps {
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
  me : any
}

const ProfileModal = ({me,open,setOpen}:ProfileModalProps) => {
  if(!open) return null;
  return (
    <div>
      <div>
        <h2>My Profile</h2>
        <img src={me?.profilePicture || "/avatar.png"}  alt="Profile" className='w-24 h-24 rounded-full object-cover mx-auto' />
        
      </div>
    </div>
  )
}

export default ProfileModal