 import React, { use } from 'react'
 interface GroupInfoModalProp {
    selectedConversation : any,
    me : any,
    open : boolean,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
}
 const GroupInfoModal = ({selectedConversation,me,open,setOpen}:GroupInfoModalProp) => {
    if(!open){
        return null;
    }
   return (
     <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
        <div className="bg-white p-5 rounded w-400px">
            <h2>{selectedConversation.groupName}</h2>
            <h3>Members</h3>
            {selectedConversation.participants.map((user:any)=>(
                <div key={user._id}>
                    {user.name}
                    {selectedConversation.groupAdmin._id === user._id && (
                        <span>(Admin)</span>
                    )}
                </div>
            ))}
            <button onClick={()=>setOpen(false)}>Close</button>
        </div>
     </div>
   )
 }
 
 export default GroupInfoModal