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
     <div>GroupInfoModal</div>
   )
 }
 
 export default GroupInfoModal