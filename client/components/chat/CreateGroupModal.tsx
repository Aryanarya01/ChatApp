import React, { useState } from 'react'

interface groupModalProps {
    users : any[],
    setOpenGroupModal : React.Dispatch<React.SetStateAction<boolean>>;
    fetchConversations :  ()=> void;
}

const CreateGroupModal = ({users,setOpenGroupModal,fetchConversations}:groupModalProps) => {
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  return (
    <div>CreateGroupModal</div>
  )
}

export default CreateGroupModal