import React from "react";

interface MessageListProps {
  message: any[];
  me: any;
  messageEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessageList = ({ message, me, messageEndRef }: MessageListProps) => {
  // return (
  //   <div className="flex-1 overflow-y-auto px-8 py-6">
  //     <div className="flex flex-col gap-5">
  //       {message.map((mess: any) => (
  //         <div
  //           key={mess._id}
  //           className={`max-w-[70%] p-3 rounded-lg ${
  //             mess.sender?._id === me?._id
  //               ? "self-end bg-blue-500 text-white"
  //               : "self-start bg-gray-200 text-black"
  //           }`}
  //         >
  //          {mess.image && (
  //           <img src={`http://localhost:9090/${mess.image}`} alt="message" className="w-56 rounded-lg mb-2" />
  //          )}
  //          {mess.content && <p>{mess.content}</p>}
  //           <p className="text-xs mt-1">
  //             {new Date(mess.createdAt).toLocaleTimeString([], {
  //               hour: "2-digit",
  //               minute: "2-digit",
  //             })}
  //           </p>

  //           {mess.sender?._id === me?._id && (
  //             <p className="text-xs">{mess.seen ? "Seen" : "Delivered"}</p>
  //           )}
  //         </div>
  //       ))}
  //       <div ref={messageEndRef}></div>
  //     </div>
  //   </div>
  // );
  return(
    <div className="flex-1 overflow-y-auto px-8 py-6">
  //     <div className="flex flex-col gap-5">
    {message.map((mess :any)=>{
      const isMe = mess.sender?._id === me?._id;
      return(
        <div key={mess._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            {/* other user avatar */}
            {!isMe && (
              <img src={mess.sender?.profilePicture || "/avatar.png"} 
                className="w-10 h-10 rounded-full object-cover mr-3 self-end ring-2 ring-white/10"
              />
            )}

            <div className={`max-w-[68%] rounded-[28px] px-5 py-4 transition-all duration-300 hover:scale-[1.02]
              ${
                isMe
                  ? "bg-gradient-to-br from-cyan-500/30 to-sky-700/40 border border-cyan-300/20 backdrop-blur-xl shadow-[0_0_25px_rgba(34,211,238,0.18)] text-white"
                  : "bg-white/5 border border-white/10 backdrop-blur-xl text-white"
              }`}>
                {/* group name  */}
              {

              }
              {/* image */}
              {
                
              }
            </div>
        </div>
      )
    })}
    </div>
  </div>
  )
};

export default MessageList;
