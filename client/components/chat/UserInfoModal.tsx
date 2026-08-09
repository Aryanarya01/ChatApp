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
        <div className='fixed inset-0 z-70 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
          <div className='relative w-[380px] rounded-[28px] border border-cyan-400/20  bg-[#08131F]/95 backdrop-blur-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]'>
            <div className='flex items-center justify-between mb-8'>
               
              <button className='absolute right-5 top-5 text-xl text-slate-400 hover:text-white transition' onClick={()=>setOpen(false)}>✕</button>
              <h2 className='font-semibold text-center text-xl mb-6 text-white'>User Info</h2>
            </div>
          {/* image */}
          <div className='flex justify-center'><img className='w-28 h-28 rounded-full object-cover mx-auto ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(34,211,238,.25)]' src={selectedUser.profilePicture} alt="Profile" /></div>

            {/* name */}
            <div className='mt-6 text-center'>
              <h2 className='text-2xl font-semibold text-white'>{selectedUser.name}</h2>
                
               <p className='text-slate-400 mt-1'>@{selectedUser?.username}</p>
               <p className="text-sm text-slate-500 mt-2">{selectedUser?.email}</p>
            </div>

            <div className='mt-6 rounded-2xl bg-white/5 border border-white/10 p-4 text-center'>
              <span className='text-xs text-emerald-400'>● Available to chat</span>
            </div>
          </div>
        </div>
    </>
  )
}

export default UserInfoModal