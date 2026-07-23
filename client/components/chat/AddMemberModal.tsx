import React from "react";

interface AddMemberModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConversation: any;
  users: any[];
  fetchConversations: () => void;
}

const AddMemberModal = ({open,setOpen,selectedConversation,users,fetchConversations} : AddMemberModalProps) => {
    if(!open) return null;
  return (
    <div>
        <div className="bg-white p-5 rounded w-400px">
            <h2 className="text-xl font-bold mb-4">Add Members</h2>
            <button onClick={()=>setOpen(false)}>Close</button>
        </div>
    </div>
  );
};

export default AddMemberModal;
