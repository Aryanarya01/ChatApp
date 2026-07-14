import React from "react";

interface SidebarProps {
  conversation: any[];
  me: any;
  onlineUsers: string[];
  selectedConversation: any;
  setSelectedConversation: any;
  setSelectedUser: any;
}

const Sidebar = ({
  conversation,
  me,
  onlineUsers,
  selectedConversation,
  setSelectedConversation,
  setSelectedUser,
}: SidebarProps) => {
  return (
    <>
      <div className="w-1/4 border-r p-4">
        <h2 className="text-xl font-bold mb-4">Chat page..</h2>

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
                  setSelectedUser(otherUser);
                }}
                className="flex justify-between items-center"
              >
                <h4>{otherUser.name}</h4>
                <div className="flex flex-row items-end gap-1">
                  {onlineUsers.includes(otherUser._id) && <span>🟢</span>}
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
    </>
  );
};

export default Sidebar;
