import React from "react";

interface SidebarProps {
  conversation: any[];
  me: any;
  onlineUsers: string[];
  selectedConversation: any;
  setSelectedConversation: any;
  setSelectedUser: any;
  openGroupModal: boolean;
  setOpenGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  openProfileModel: boolean;
  setOpenProfileModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({
  conversation,
  me,
  onlineUsers,
  selectedConversation,
  setSelectedConversation,
  setSelectedUser,
  openGroupModal,
  setOpenGroupModal,
  openProfileModel,
  setOpenProfileModel,
}: SidebarProps) => {
  return (
    <>
      <div className="w-[340px] bg-[#091827]/97 backdrop-blur-xl border-r border-white/10 flex flex-col">

        <div className="p-5 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white mb-5">🌊 ZenChat</h1>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold py-3"
            onClick={() => setOpenGroupModal(true)}
          >
            + New Group
          </button>
        </div>

         

        {/* Profile */}
        <div
          className="mx-4 mt-5 mb-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer flex items-center gap-3"
          onClick={() => setOpenProfileModel(true)}
        >
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            src={me?.profilePicture || "/avatar.png"}
            alt="Profile"
          />
          <div className="ml-5">
            <p className="font-semibold text-white">{me?.name}</p>
            <p className="text-sm text-slate-400 truncate">{me?.email}</p>
          </div>
        </div>

        <div className="border-b border-white/10 mx-4 mb-4"></div>
        <div className="flex-1 overflow-y-auto px-3 pb-4">
        {/* conversation List */}
        {conversation.map((conv: any) => {
          const otherUser = conv.participants.find(
            (p: any) => p._id !== me?._id,
          );
          return (
            <div
              key={conv._id}
              className={`p-3 cursor-pointer ${selectedConversation?._id === conv._id ? "bg-gray-300" : "hover:bg-gray-100"}`}
            >
              <div
                onClick={() => {
                  setSelectedConversation(conv);
                  if (conv.isGroup) {
                    setSelectedUser(null);
                  } else {
                    setSelectedUser(otherUser);
                  }
                }}
                className="flex justify-between items-center"
              >
                <img className="w-10 h-10 rounded-full object-cover" src={conv.isGroup ? conv.groupProfilePicture || "/group.png" :  otherUser?.profilePicture || "/avatar.png"} alt="" />
                <h4>{conv.isGroup ? conv.groupName : otherUser?.name}</h4>
                <div className="flex flex-row items-end gap-1">
                  {!conv.isGroup && onlineUsers.includes(otherUser?._id) && (
                    <span>🟢</span>
                  )}
                  {conv.unreadCount > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500">
                {conv.lastMessage?.content || "No messages"}
              </p>
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
