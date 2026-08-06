import clientServer from "@/lib/axios";
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
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="w-[420px] rounded-[28px] border border-red-400/20 bg-[#08131F]/90 backdrop-blur-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,.45)]">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Remove Member
        </h2>

        <button
          onClick={() => setOpen(false)}
          className="text-2xl text-slate-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">

        {selectedConversation.participants.map((user: any) => (
          <div
            key={user._id}
            className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-3"
          >
            <div className="flex items-center gap-3">

              <img
                src={user.profilePicture || "/avatar.png"}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p className="text-white font-medium">
                  {user.name}
                </p>

                <p className="text-xs text-slate-400">
                  @{user.username}
                </p>
              </div>

            </div>

            {AdminId.toString() === user._id.toString() ? (
              <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                Admin
              </span>
            ) : (
              <button
                onClick={() => handelRemoveMember(user._id)}
                className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-2 text-red-300 hover:bg-red-500/30 transition"
              >
                Remove
              </button>
            )}

          </div>
        ))}

      </div>

    </div>
  </div>
);  
};

export default RemoveMemberModal;
