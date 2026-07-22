 import React from 'react'
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
            

        </div>
     </div>
   )
 }
 
 export default GroupInfoModal