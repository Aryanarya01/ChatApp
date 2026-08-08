import React from 'react'
interface UserInfoModalProps{
    open : boolean,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
     
}

const UserInfoModal = ({open,setOpen}:UserInfoModalProps) => {
  if(!open){
    return null;
  }
  return (
    <>
      
    </>
  )
}

export default UserInfoModal