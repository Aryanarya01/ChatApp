import  express from "express";
const app = express();
const port = 9090;



const startDb = async()=>{
    app.listen(port,()=>{
        console.log(`App is listining to port ${port}`);
    })
}

startDb()