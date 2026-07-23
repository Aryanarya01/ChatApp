import React from "react";

interface AddMemberModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConversation: any;
  users: any[];
  fetchConversations: () => void;
}

const AddMemberModal = ({open,setOpen,selectedConversation,users} : AddMemberModalProps) => {
    if(!open) return null;
  return (
    <div>

    </div>
  );
};

export default AddMemberModal;
