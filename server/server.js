import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import AuthRoute from "./src/routes/auth.js";
import PostRoute from "./src/routes/post.js";
import UploadRoute from "./src/routes/multerImage.js";
import UserRoute from "./src/routes/users.js";
import SearchRoute from "./src/routes/search.js";
import CommentRoute from "./src/routes/comments.js";
import BookingRoute from "./src/routes/booking.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const port = 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.options("*", cors());

app.use("/auth", AuthRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/user", UserRoute);
app.use("/search", SearchRoute);
app.use("/comment", CommentRoute);
app.use("/booking", BookingRoute);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = receiverName;
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.listen(port, () => {
  console.log(`Rental app listening at http://localhost:${port}`);
});

server.listen(3000, () => {
  console.log("Socket server listening on port 3000");
});

export default io;
