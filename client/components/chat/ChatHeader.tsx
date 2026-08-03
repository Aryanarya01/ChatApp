import React from "react";

interface chatHeaderProps {
  selectedUser: any;
  isTyping: Boolean;
  selectedConversation: any;
  setOpenGroupInfo : React.Dispatch<React.SetStateAction<boolean>>
}

const ChatHeader = ({
  selectedUser,
  isTyping,
  selectedConversation,
  setOpenGroupInfo
}: chatHeaderProps) => {
  return (
    <div className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md px-6 flex items-center justify-between">
      {/* left */}
    
      <div className={`flex items-center gap-4 ${selectedConversation.isGroup ? "cursor-pointer" : ""}`} onClick={()=>{
        if(selectedConversation?.isGroup){
          setOpenGroupInfo(true)
        }
      }}>
        {selectedConversation?.isGroup
          ? selectedConversation.groupName
          : selectedUser.name}
      </div>
      {isTyping && <p className="text-sm text-gray-500">Typing...</p>}
    </div>
  );
};

export default ChatHeader;
