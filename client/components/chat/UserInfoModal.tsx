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
        <div>
          <div>
            <div>
              <h2>User Info</h2>
              <button>✕</button>
            </div>
            
          </div>
        </div>
    </>
  )
}

export default UserInfoModal