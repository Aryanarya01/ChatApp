import React, { use } from "react";
interface GroupInfoModalProp {
  selectedConversation: any;
  me: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const GroupInfoModal = ({
  selectedConversation,
  me,
  open,
  setOpen,
}: GroupInfoModalProp) => {
  if (!open) {
    return null;
  }
  const isAdmin = selectedConversation.groupAdmin._id === me._id;
  return (
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
          <button>Add Member</button>
          <button>Remove Member</button>
        </>
      )}
      <button>Leave Group</button>
    </div>
  );
};

export default GroupInfoModal;
