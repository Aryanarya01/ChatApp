import clientServer from "@/lib/axios";
import React, { useState } from "react";

interface groupModalProps {
  users: any[];
  setOpenGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchConversations: () => void;
}

const CreateGroupModal = ({
  users,
  setOpenGroupModal,
  fetchConversations,
}: groupModalProps) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handelCreateGroup = async () => {
    try {
      if (!groupName.trim()) {
        alert("Enter group name");
        return;
      }

      if (selectedUsers.length < 2) {
        alert("Select at least 2 users");
        return;
      }
      const { data } = await clientServer.post("/conversation/group", {
        groupName,
        participants: selectedUsers,
      });
      console.log(data);
      fetchConversations();
      setOpenGroupModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="w-[450px] rounded-[28px] border border-cyan-400/20 bg-[#08131F]/90 backdrop-blur-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,.45)]">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Create Group
        </h2>

        <button
          onClick={() => setOpenGroupModal(false)}
          className="text-2xl text-slate-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Group Name */}
      <input
        type="text"
        placeholder="Enter group name..."
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 mb-6"
      />

      {/* Members */}
      <h3 className="text-white font-semibold mb-3">
        Select Members
      </h3>

      <div className="space-y-3 max-h-72 overflow-y-auto">

        {users.map((user) => (
          <label
            key={user._id}
            className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-3 cursor-pointer hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3">

              <img
                src={user.profilePicture || "/avatar.png"}
                className="w-12 h-12 rounded-full object-cover"
                alt=""
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

            <input
              type="checkbox"
              checked={selectedUsers.includes(user._id)}
              onChange={() => handleSelectUser(user._id)}
              className="w-5 h-5 accent-cyan-500"
            />
          </label>
        ))}

      </div>

      {/* Button */}
      <button
        onClick={handelCreateGroup}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-white font-semibold hover:scale-[1.02] transition"
      >
        Create Group
      </button>

    </div>
  </div>
);
};

export default CreateGroupModal;
