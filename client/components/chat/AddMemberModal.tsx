import React from 'react'

interface AddMemberModalProps{
    open : boolean,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>,
    selectedConversation : any,
    users : any[],
    fetchConversations : ()=> void,
}

const AddMemberModal = () => {
  return (
    <div>AddMemberModal</div>
  )
}

export default AddMemberModal