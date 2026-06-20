import type { Server, Socket } from "socket.io";

export const onlineUser = new Map<string, string>();

const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("user connected", socket.id);

    socket.on("setup", (userId: string) => {
      onlineUser.set(userId, socket.id);
      io.emit("onlineUsers")
      console.log("Online user :", onlineUser);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUser.entries()) {
        if (socketId === socket.id) {
          onlineUser.delete(userId);
          break;
        }
      }
      console.log("user disconnected", socket.id);
    });
  });
};

export default socketHandler;
