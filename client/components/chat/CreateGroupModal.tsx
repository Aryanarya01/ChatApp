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

  return(
    <div>
        <input type="text" placeholder="Group Name" value={groupName} onChange={(e)=> setGroupName(e.target.value)} />
    </div>
  );
};

export default CreateGroupModal;
