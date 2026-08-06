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
          <div>
            <img className="" src={URL.createObjectURL(image)} alt="Preview" />
            <button onClick={()=>setImage(null)}>✕</button>
          </div>
        )
      }

      {/* input row */}
      <div>
        <label htmlFor="">📎 
         <input type="file" onChange={(e)=>{
        if(e.target.files?.[0]){
          setImage(e.target.files[0])
        }
      }} />
      </label>
      
{/* message input */}

       
      
      <input
        className="flex-1 border rounded p-2"
        placeholder="Type message..."
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
        className="bg-blue-500 text-white px-4 rounded"
        onClick={handelSendMessage}
      >
        Send
      </button>
    </div>
    </div>
  );
};

export default MessageInput;
