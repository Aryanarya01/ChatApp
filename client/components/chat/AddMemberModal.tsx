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
    try {
      const { data } = await clientServer.patch(
        "/conversation/group/add-member",
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[420px] rounded-[28px] border border-cyan-400/20 bg-[#08131F]/90 backdrop-blur-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,.45)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Add Members</h2>
          <button className="text-2xl text-slate-400 hover:text-white" onClick={()=>setOpen(false)}>✕</button>
        </div>


        <div className="space-y-3 max-h-80 overflow-y-auto"> 
        {availableUsers.map((user: any) => (
          <div key={user._id}
            className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-3"
          >
            <div className="flex items-center gap-3">
              {/* img */}
              <img className="w-12 h-12 rounded-full object-cover" src={user.profilePicture || "/avatar.png"}  />
              <div>
                <p className="text-white font-medium">{user.name}</p>
                 <p className="text-xs text-slate-400">
                  @{user.username}
                </p>
              </div>
            </div>
              <button className="rounded-xl bg-cyan-500" onClick={()=>handelAddMember(user._id)}>Add</button>
          </div>
        ))}
        </div>
         
      </div>
    </div>
  );
};

export default AddMemberModal;
