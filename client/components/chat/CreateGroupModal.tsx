import React, { useState } from "react";

interface groupModalProps {
  users: any[];
  setOpenGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchConversations: () => void;
}

const CreateGroupModal = ({
  users,
  setOpenGroupModal,
  fetchConversations,
}: groupModalProps) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleSelectUser = (userId : string)=>{
      if(selectedUsers.includes(userId)){
        setSelectedUsers(selectedUsers.filter((id)=>id !== userId))
      }else{
        setSelectedUsers([...selectedUsers, userId])
      }
    }

  return(
    <div>
        <input type="text" placeholder="Group Name" value={groupName} onChange={(e)=> setGroupName(e.target.value)} />
        {users.map((user)=>(
            <div key={user._id}>
                <input type="checkbox" checked={selectedUsers.includes(user._id)} onChange={()=>handleSelectUser(user._id)}/>
                <span>{user.name}</span>
            </div>
        ))}
    </div>
  );
};

export default CreateGroupModal;
