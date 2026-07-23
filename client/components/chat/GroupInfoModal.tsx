import React, { useState } from "react";
import AddMemberModal from "./AddMemberModal";
 
interface GroupInfoModalProp {
  selectedConversation: any;
  me: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  users: any[];
  fetchConversations: () => void;
}
const GroupInfoModal = ({
  selectedConversation,
  me,
  open,
  setOpen,
  users,
  fetchConversations,
}: GroupInfoModalProp) => {
   const [openAddMember, setOpenAddMember] = useState(false);
  if (!open) {
    return null;
  }
  
  const isAdmin = selectedConversation.groupAdmin._id === me._id;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-96">
        <h2>{selectedConversation.groupName}</h2>
        <h3>Members</h3>
        {selectedConversation.participants.map((user: any) => (
          <div key={user._id}>
            {user.name}
            {selectedConversation.groupAdmin._id === user._id && (
              <span>(Admin)</span>
            )}
          </div>
        ))}
    
      {isAdmin && (
        <>
          <button onClick={() => setOpenAddMember(true)}>Add Member</button>
          <button>Remove Member</button>
        </>
      )}

      <button>Leave Group</button>
              <button onClick={() => setOpen(false)}>Close</button>
              </div>
         <AddMemberModal
        open={openAddMember}
        setOpen={setOpenAddMember}
        selectedConversation={selectedConversation}
        users={users}
        fetchConversations={fetchConversations}
      />
    </div>
   
  );
};

export default GroupInfoModal;
