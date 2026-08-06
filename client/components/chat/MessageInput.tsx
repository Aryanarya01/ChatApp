import React from "react";

interface MessageInputProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  selectedConversation: any;
  typingTimeout: React.MutableRefObject<NodeJS.Timeout | null>;
  handelSendMessage: () => void;
  socket: any;
  setImage : React.Dispatch<React.SetStateAction<File | null>>;
  image : File | null;
}

const MessageInput = ({
  content,
  setContent,
  selectedConversation,
  typingTimeout,
  handelSendMessage,
  socket,
  setImage,
  image
}: MessageInputProps) => {
  return (
    <div className="border-t border-white/10 px-6 py-4 backdrop-blur-xl bg-[#08131F]/90">
      {/* image */}
      {
        image && (
          <div className="mb-4 flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-3 w-fit">
            <img className="w-24 h-24 rounded-full object-cover" src={URL.createObjectURL(image)} alt="Preview" />
            <button className="w-9 h-9 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition" onClick={()=>setImage(null)}>✕</button>
          </div>
        )
      }

      {/* input row */}
      <div className="flex items-center gap-3">
        <label className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition text-xl">
        📎 
         <input type="file" className="hidden" onChange={(e)=>{
        if(e.target.files?.[0]){
          setImage(e.target.files[0])
        }
      }} />
      </label>
      
{/* message input */}

       
      
      <input
        className="flex-1 rounded-2xl bg-white/5 border border-white/10 py-3 px-5 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400"
        placeholder="Write a peaceful message..."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          socket.emit("typing", selectedConversation._id);
          if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
          }
          typingTimeout.current = setTimeout(() => {
            socket.emit("stopTyping", selectedConversation._id);
          }, 1000);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handelSendMessage();
          }
        }}
      />
      <button
        className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-white font-semibold hover:scale-105 transition "
        onClick={handelSendMessage}
      >
        Send
      </button>
    </div>
    </div>
  );
};

export default MessageInput;
