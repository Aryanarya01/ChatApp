import React from "react";

interface MessageListProps {
  message: any[];
  me: any;
  messageEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessageList = ({ message, me, messageEndRef }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex flex-col gap-3 w-full">
        {message.map((mess: any) => (
          <div
            key={mess._id}
            className={`max-w-[70%] p-3 rounded-lg ${
              mess.sender?._id === me?._id
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200 text-black"
            }`}
          >
             {
              mess.messageType === "image" ? (
                <img src="" alt="message" className="w-56 rounded-lg" />
              ) : (
                <p>{mess.content}</p>
              )
             }
            <p className="text-xs mt-1">
              {new Date(mess.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {mess.sender?._id === me?._id && (
              <p className="text-xs">{mess.seen ? "Seen" : "Delivered"}</p>
            )}
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
};

export default MessageList;
