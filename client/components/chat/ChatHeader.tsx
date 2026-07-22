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
    <div className="border-b p-4">
      <h2 className="text-xl font-semibold" onClick={()=>{
        if(selectedConversation?.isGroup){
          setOpenGroupInfo(true)
        }
      }}>
        {selectedConversation?.isGroup
          ? selectedConversation.groupName
          : selectedUser.name}
      </h2>
      {isTyping && <p className="text-sm text-gray-500">Typing...</p>}
    </div>
  );
};

export default ChatHeader;
