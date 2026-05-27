 
import dotenv from "dotenv"
import { createServer } from "node:http";

dotenv.config()
const app = express();
const port = process.env.PORT || 9090;
const server = createServer

const startDb = async()=>{
    app.listen(port,()=>{
        console.log(`App is listining to port ${port}`);
    })
}

startDb()