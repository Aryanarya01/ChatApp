import { io } from "socket.io-client";

export const socket = io("https://chatapp-kysv.onrender.com",{
    autoConnect : false,
    withCredentials : true,
})