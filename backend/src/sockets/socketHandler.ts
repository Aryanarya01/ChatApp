import type { Server, Socket } from "socket.io";

const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("user connected", socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};



export default socketHandler;