import clientServer from "@/lib/axios";
import React from "react";
interface RemoveMemberModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConversation: any;
  fetchConversations: () => void;
  setSelectedUser : React.Dispatch<React.SetStateAction<any>>;
    setSelectedConversation :React.Dispatch<React.SetStateAction<any>>;
}

const RemoveMemberModal = ({
  open,
  setOpen,
  selectedConversation,
  fetchConversations,
  setSelectedConversation,
  setSelectedUser
}: RemoveMemberModalProps) => {
  if (!open) return null;
  const AdminId =
    selectedConversation.groupAdmin?._id || selectedConversation.groupAdmin;

  const handelRemoveMember = async (userId: string) => {
    try {
      const { data } = await clientServer.patch(
        "/conversation/group/remove-member",
        {
          conversationId: selectedConversation._id,
          userId,
        },
      );
      console.log(data);
      await fetchConversations();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        <h2>Remove Member</h2>
        {selectedConversation.participants.map((user: any) => (
          <div key={user._id}>
            <span>{user.name}</span>
            {AdminId.toString() === user._id.toString() ? (
              <span>(Admin)</span>
            ) : (
              <button onClick={() => handelRemoveMember(user._id)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button onClick={() => setOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default RemoveMemberModal;
