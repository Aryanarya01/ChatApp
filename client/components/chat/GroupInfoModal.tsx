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
  if (!open) {
    return null;
  }
  const [openAddMember, setOpenAddMember] = useState(false);
  const isAdmin = selectedConversation.groupAdmin._id === me._id;
  return (
    <>
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-400px">
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
        <button onClick={() => setOpen(false)}>Close</button>
      </div>
      {isAdmin && (
        <>
          <button onClick={() => setOpenAddMember(true)}>Add Member</button>
          <button>Remove Member</button>
        </>
      )}

      <button>Leave Group</button>
          
    </div>
   <AddMemberModal
        open={openAddMember}
        setOpen={setOpenAddMember}
        selectedConversation={selectedConversation}
        users={users}
        fetchConversations={fetchConversations}
      />
      </>
  );
};

export default GroupInfoModal;
