import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
a
app.get("/", (req, res) => {
  res.send("working");
});


export default app;