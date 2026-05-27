import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import app from "./app.js";
dotenv.config();

const port = process.env.PORT || 9090;
const server = createServer(app);

const io = new Server(server,{
    cors : {
        origin : "",
        credentials : true,
    }
})






const startDb = async () => {
  app.listen(port, () => {
    console.log(`App is listining to port ${port}`);
  });
};

startDb();
