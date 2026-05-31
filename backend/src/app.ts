import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"
import conversationRoute from "./routes/conversation.route.js"
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(userRoute);
app.use(conversationRoute)
app.get("/", (req, res) => {
  res.send("working");
});


export default app;