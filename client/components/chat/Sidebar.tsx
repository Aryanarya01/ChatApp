import React, { useEffect, useState } from "react";

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
  users : any[]
}

const Sidebar = ({
  users,
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
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(()=>{
      if(!search.trim()){
        setFilteredUsers([]);
        return;
      }
    },[search,users])

  return (
    <>
      <div className="w-[340px] bg-[#08131F]/95 backdrop-blur-xl border-r border-white/10 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">ZenChat</h1>
              <p className="text-slate-400 text-sm">Stay connected</p>
            </div>
            <button
              className="w-11 h-11 bg-cyan-500 hover:bg-cyan-400 transition text-white rounded-xl text-2xl"
              onClick={() => setOpenGroupModal(true)}
            >
              +
            </button>
          </div>
        </div>
        <div className="px-4 py-4">
          {/* search */}
          <input
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search chats..."
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400"
          />
        </div>

        {/* Profile */}
        <div
          className="mx-4 mb-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer flex items-center gap-3"
          onClick={() => setOpenProfileModel(true)}
        >
          <img
            className="w-14 h-14 rounded-full object-cover ring-2 ring-cyan-400"
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
                className={`p-4 cursor-pointer mb-2 rounded-2xl transition-all hover:scale-[1.02] duration-300 ${
                  selectedConversation?._id === conv._id
                    ? "bg-white/10 border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
                    : "hover:bg-white/5 border border-transparent"
                }`}
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
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className={`w-12 h-12 rounded-full object-cover transition
${
  selectedConversation?._id === conv._id
    ? "ring-2 ring-cyan-400"
    : "ring-2 ring-white/10"
}`}
                      src={
                        conv.isGroup
                          ? conv.groupProfilePicture || "/group.png"
                          : otherUser?.profilePicture || "/avatar.png"
                      }
                      alt=""
                    />

                    <div>
                      <h4 className="font-semibold text-white">
                        {conv.isGroup ? conv.groupName : otherUser?.name}
                      </h4>


                      {/* online */}
                      {/* <div className="flex items-center gap-2 mt-1">
                        {!conv.isGroup &&
                          onlineUsers.includes(otherUser?._id) && (
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                          )}
                        <span className="text-xs text-slate-400">
                          {conv.isGroup ? "Group" : "Online"}
                        </span>
                      </div> */}
<div className="flex items-center gap-2 mt-1">
  {!conv.isGroup && (
    <>
      <span
        className={`w-2.5 h-2.5 rounded-full ${
          onlineUsers.includes(otherUser?._id)
            ? "bg-emerald-400 shadow-[0_0_10px_#34d399]"
            : "bg-gray-500"
        }`}
      ></span>

      <span className="text-xs text-slate-400">
        {onlineUsers.includes(otherUser?._id) ? "Online" : "Offline"}
      </span>
    </>
  )}

  {conv.isGroup && (
    <span className="text-xs text-slate-400">Group</span>
  )}
</div>

                      
                    </div>
                  </div>

                  {/* right */}
                  {conv.unreadCount > 0 && (
                    <span className="min-w-6 h-6 rounded-full bg-cyan-500 text-xs flex items-center justify-center text-white">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-400 mt-2 truncate pl-[60px]">
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
