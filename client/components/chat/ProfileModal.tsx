import React from 'react'

interface ProfileModalProps {
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
  me : any
}

const ProfileModal = () => {
  return (
    <div>ProfileModal</div>
  )
}

export default ProfileModal