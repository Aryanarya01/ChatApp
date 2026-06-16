import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDb from "./config/db.js";
import socketHandler from "./sockets/socketHandler.js";
dotenv.config();

const port = process.env.PORT || 9090;
const server = createServer(app);

const io = new Server(server,{
    cors : {
        origin : "http://localhost:3000",
        credentials : true,
    }
})


socketHandler(io);


const startDb = async () => {
   await connectDb()
  server.listen(port, () => {
    console.log(`App is listining to port ${port}`);
  });
};

startDb();
