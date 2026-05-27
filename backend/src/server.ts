import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDb from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 9090;
const server = createServer(app);

const io = new Server(server,{
    cors : {
        origin : "",
        credentials : true,
    }
})



io.on("connection",(socket)=>{
    console.log("User Connected",socket.id);

    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id)
    })
})


const startDb = async () => {
    connectDb()
  app.listen(port, () => {
    console.log(`App is listining to port ${port}`);
  });
};

startDb();
