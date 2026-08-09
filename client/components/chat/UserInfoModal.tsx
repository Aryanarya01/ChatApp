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
            <div className='min-h-screen'>
              <h2>User Info</h2>
              <button className='bg-green-600' onClick={()=>setOpen(false)}>✕</button>
            </div>

          </div>
        </div>
    </>
  )
}

export default UserInfoModal