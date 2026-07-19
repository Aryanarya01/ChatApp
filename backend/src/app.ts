import express from "express";
import cors from "cors";
import path from "path"
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use("/uploads",express.static(path.join(process.cwd(),"uploads")))
app.use(cookieParser());
app.use("/auth", userRoute);
app.use("/conversation", conversationRoute);
app.use("/messages", messageRoute);
app.get("/", (req, res) => {
  res.send("working");
});

export default app;
