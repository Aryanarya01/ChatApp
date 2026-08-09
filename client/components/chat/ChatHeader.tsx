import React from "react";

interface chatHeaderProps {
  selectedUser: any;
  isTyping: Boolean;
  selectedConversation: any;
  setOpenGroupInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenUserInfoModal : React.Dispatch<React.SetStateAction<boolean>>;
  onlineUsers: string[];
}

const ChatHeader = ({
  selectedUser,
  isTyping,
  selectedConversation,
  setOpenGroupInfo,
  onlineUsers,
  setOpenUserInfoModal
}: chatHeaderProps) => {
  return (
    <div className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md px-6 flex items-center justify-between">
      {/* left */}
      <div
        className={`flex items-center gap-4 ${selectedConversation.isGroup || selectedConversation ? "cursor-pointer" : ""}`}
        onClick={() => {
          if (selectedConversation?.isGroup) {
            setOpenGroupInfo(true);
          }else{
            setOpenUserInfoModal(true)
          }
        }}
      >
        <img
          src={
            selectedConversation?.isGroup
              ? selectedConversation.groupImage || "/group.png"
              : selectedUser?.profilePicture || "/avatar.png"
          }
          alt=""
          className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-400"
        />
        <div>
          <h2 className="text-lg font-semibold text-white">
            {selectedConversation?.isGroup
              ? selectedConversation.groupName
              : selectedUser?.name}
          </h2>

          <div className="flex items-center gap-2 mt-1">
            {selectedConversation?.isGroup ||
              (selectedConversation && (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"></span>
                 <span className="text-sm text-slate-400">
  {isTyping
    ? "Typing..."
    : onlineUsers.includes(selectedUser?._id)
      ? "Online"
      : "Offline"}
</span>
                </>
              ))}
            {selectedConversation?.isGroup && (
              <span className="text-sm text-slate-400">Group Conversation</span>
            )}
          </div>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition text-xl">
          📞
        </button>
        <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition text-xl">
          🎥
        </button>
        <button
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition text-xl"
          onClick={() => {
            if (selectedConversation?.isGroup) {
              setOpenGroupInfo(true);
            }else{
              setOpenUserInfoModal(true);
            }
          }}
        >
          ℹ️
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
