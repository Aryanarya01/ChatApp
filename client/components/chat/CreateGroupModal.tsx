import clientServer from "@/lib/axios";
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

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handelCreateGroup = async () => {
    try {
      if (!groupName.trim()) {
  alert("Enter group name");
  return;
}

if (selectedUsers.length < 2) {
  alert("Select at least 2 users");
  return;
}
      const { data } = await clientServer.post("/conversation/group", {
        groupName,
        participants: selectedUsers,
      });
      console.log(data);
      fetchConversations();
      setOpenGroupModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      {users.map((user) => (
        <div key={user._id}>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user._id)}
            onChange={() => handleSelectUser(user._id)}
          />
          <span>{user.name}</span>
        </div>
      ))}
      <button
        onClick={() => handelCreateGroup()}
        className="bg-blue-500 p-2 rounded m-3"
      >
        Create Group
      </button>
    </div>
  );
};

export default CreateGroupModal;
