import React, { useState } from 'react'

interface groupModal {
    users : 
    setOpenGroupModal :
    fetchConversations :  
}

const CreateGroupModal = () => {
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  return (
    <div>CreateGroupModal</div>
  )
}

export default CreateGroupModal