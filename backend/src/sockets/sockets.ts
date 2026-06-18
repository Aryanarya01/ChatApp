import type { Server } from "socket.io";
let io: Server;


export const setIo = (socketIO: Server)=>{
    io = socketIO;
}

export const getIO = ()=>io;