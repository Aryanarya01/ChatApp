import clientServer from "@/lib/axios";
import React from "react";

interface AddMemberModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConversation: any;
  users: any[];
  fetchConversations: () => void;
}

const AddMemberModal = ({
  open,
  setOpen,
  selectedConversation,
  users,
  fetchConversations,
}: AddMemberModalProps) => {
  if (!open) return null;
  const availableUsers = [];
  for (const user of users) {
    let found = false;
    for (const member of selectedConversation.participants) {
      if (member._id === user._id) {
        found = true;
      }
    }
    if (!found) {
      availableUsers.push(user);
    }
  }
  const handelAddMember = async (userId: string) => {
    try{
      const {data} = await clientServer.patch("/conversation/group/add-member",{
        conversationId : selectedConversation._id,
        userId,
    })
    }catch(err){
      console.log(err)
    }
  };
  return (
    <div>
      <div className="bg-white p-5 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Add Members</h2>
        {availableUsers.map((user: any) => (
          <div key={user._id}>
            <button onClick={() => handelAddMember(user._id)}>
              {user.name}
            </button>
          </div>
        ))}
        <button onClick={() => setOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default AddMemberModal;
