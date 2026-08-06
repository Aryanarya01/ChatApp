import React, { useState } from "react";
import AddMemberModal from "./AddMemberModal";
import RemoveMemberModal from "./RemoveMemberModal";
import clientServer from "@/lib/axios";

interface GroupInfoModalProp {
  selectedConversation: any;
  me: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  users: any[];
  fetchConversations: () => void;
  setSelectedUser: React.Dispatch<React.SetStateAction<any>>;
  setSelectedConversation: React.Dispatch<React.SetStateAction<any>>;
}
const GroupInfoModal = ({
  selectedConversation,
  me,
  open,
  setOpen,
  users,
  fetchConversations,
  setSelectedUser,
  setSelectedConversation,
}: GroupInfoModalProp) => {
  const [openAddMember, setOpenAddMember] = useState(false);
  const [openRemoveMember, setOpenRemoveMember] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [groupName, setGroupName] = useState(selectedConversation.groupName);

  if (!open) {
    return null;
  }
  const AdminId =
    selectedConversation.groupAdmin?._id || selectedConversation.groupAdmin;

  const isAdmin = AdminId.toString() === me._id.toString();

  const handleLeaveGroup = async () => {
    try {
      const { data } = await clientServer.patch(
        "/conversation/group/leave-group",
        {
          conversationId: selectedConversation._id,
        },
      );
      console.log(data);
      await fetchConversations();

      (setSelectedConversation(null), setSelectedUser(null), setOpen(false));
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleRenameGroup = async () => {
    try {
      const { data } = await clientServer.patch("/conversation/group/rename", {
        conversationId: selectedConversation._id,
        groupName,
      });
      console.log(data);
      setGroupName(data.groupName);
      await fetchConversations();
      setEditingName(false);
    } catch (err: any) {
      console.log(err);
    }
  };
  console.log("sc", selectedConversation);
  console.log("AdminId:", AdminId);
  console.log("Me:", me._id);
  console.log("isAdmin:", isAdmin);
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="w-[500px] rounded-[30px] border border-cyan-400/20 bg-[#08131F]/90 backdrop-blur-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,.45)]">
          {/* header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white font-bold text-3xl">Group Info</h2>
            <button className="text-2xl text-slate-400 hover:text-white" onClick={()=>setOpen(false)}>✕</button>
          </div>

          {/* image */}
          <img
            src={selectedConversation.groupImage || "/group.png"}
            className="w-28 h-28 rounded-full object-cover mx-auto ring-4 ring-cyan-400 shadow-[0_0_25px_rgba(34,211,238,.25)]"
            alt="groupImage"
          />

          {/* group name */}
          <div className="mt-6 text-center">
            {editingName ? (
              <>
                <input
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-white font-semibold" onClick={handleRenameGroup}>Save Changes</button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-white">{groupName}</h2>
                <button className="mt-3 text-cyan-400 hover:text-cyan-300" onClick={() => setEditingName(true)}>
                  ✏ Rename Group
                </button>
              </>
            )}
          </div>

          {/* member */}

          <div className="mt-8">
            <h3 className="mb-4 text-lg text-white font-semibold">Members ({selectedConversation.participants.length})</h3>
            <div className="space-y-3 max-h-52 overflow-y-auto">
              {selectedConversation.participants.map((user: any) => (
                <div key={user._id}
                  className="flex items-center justify-between rounded-2xl bg-white/5 border p-3 border-white/10"
                >
                  <div className="flex items-center gap-3">
                    {/* img */}
                      <img src={user.profilePicture || "/avatar.png"} alt=""  className="w-11 h-11 rounded-full object-cover"/>
                    <div>
                      {/* name */}
                        <p className="text-white font-medium">
                      {user.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {user.username}
                    </p>
                    </div>
                  </div>

                  {AdminId.toString() === user._id.toString() && (
                    <span>(Admin)</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* button */}

          {isAdmin && (
            <div>
              <button onClick={() => setOpenAddMember(true)}>Add Member</button>
              <button onClick={() => setOpenRemoveMember(true)}>
                Remove Member
              </button>
            </div>
          )}

          <button onClick={handleLeaveGroup}>Leave Group</button>
        </div>
      </div>
      <AddMemberModal
        open={openAddMember}
        setOpen={setOpenAddMember}
        selectedConversation={selectedConversation}
        users={users}
        fetchConversations={fetchConversations}
      />
      <RemoveMemberModal
        open={openRemoveMember}
        setOpen={setOpenRemoveMember}
        selectedConversation={selectedConversation}
        fetchConversations={fetchConversations}
      />
    </>
  );
};

export default GroupInfoModal;
