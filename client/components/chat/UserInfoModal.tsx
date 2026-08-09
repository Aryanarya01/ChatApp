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
          <div className='w-[500px] rounded-[30px] border border-cyan-400/20  bg-[#08131F]/90 backdrop-blur-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.45)]'>
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