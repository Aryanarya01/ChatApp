import React from "react";

interface chatHeaderProps {
  selectedUser: any;
  isTyping: Boolean;
  selectedConversation: any;
  setOpenGroupInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHeader = ({
  selectedUser,
  isTyping,
  selectedConversation,
  setOpenGroupInfo,
}: chatHeaderProps) => {
  return (
    <div className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md px-6 flex items-center justify-between">


      
      {/* left */}
      <div
        className={`flex items-center gap-4 ${selectedConversation.isGroup ? "cursor-pointer" : ""}`}
        onClick={() => {
          if (selectedConversation?.isGroup) {
            setOpenGroupInfo(true);
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

          <div className="flex items-center gap-2 mt-1" >
              {selectedConversation?.isGroup && (
                <>
                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"></span>
                 <span className="text-sm text-slate-400">{isTyping ? "Typing" : "Online"}</span>
                </>
              )}
              {selectedConversation?.isGroup && (
                <span className="text-sm text-slate-400">Group Conversation</span>
              )}
          </div>
        </div>
      </div>
       
    </div>
  );
};

export default ChatHeader;
