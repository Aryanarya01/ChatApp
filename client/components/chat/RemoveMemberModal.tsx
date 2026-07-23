import React from "react";
interface RemoveMemberModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConversation: any;
  fetchConversations: () => void;
}

const RemoveMemberModal = ({
  open,
  setOpen,
  selectedConversation,
  fetchConversations,
}: RemoveMemberModalProps) => {
  return <div>RemoveMemberModal</div>;
};

export default RemoveMemberModal;
