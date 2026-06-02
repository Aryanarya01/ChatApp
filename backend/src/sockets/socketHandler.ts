import type { Server, Socket } from "socket.io";

const onlineUser = new Map<string,string>();

const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("user connected", socket.id);

    socket.on("setup",(userId : string)=>{
      onlineUser.set(userId,socket.id);
      
    })

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};



export default socketHandler;