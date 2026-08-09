import React from 'react'
interface UserInfoModalProps{
    open : boolean,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
      selectedUser : any
}

const UserInfoModal = ({open,setOpen,  selectedUser}:UserInfoModalProps) => {
  if(!open){
    return null;
  }
  return (
    <>
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
          <div>
            <div>
              <h2>User Info</h2>
              <button className='bg-green-600' onClick={()=>setOpen(false)}>✕</button>
            </div>
          {/* image */}
          <img src={selectedUser.profilePicture} alt="Profile" />

            {/* name */}
            <div>
              <h2>{selectedUser.name}</h2>
               <p className="text-slate-400">{selectedUser?.email}</p>
               <p>{selectedUser?.username}</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default UserInfoModal