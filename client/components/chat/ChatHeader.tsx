import React from "react";

interface chatHeader {
  selectedUser: any;
  isTyping: Boolean;
}

const ChatHeader = ({ selectedUser, isTyping }: chatHeader) => {
  return (
    <div className="border-b p-4">
      <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
      {isTyping && <p className="text-sm text-gray-500">Typing...</p>}
    </div>
  );
};

export default ChatHeader;
