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
import MessageRoute from "./src/routes/message.js";
import NotificationRoute from "./src/routes/notification.js";
import CloudinaryRoute from "./src/routes/cloudinary.js";
import http from "http";
import { Server } from "socket.io";
import pool from "./src/config/database.js";
import fileUpload from "express-fileupload";

const app = express();
const server = http.createServer(app);
const port = 5000;

app.use(
  cors({
    // origin: ["http://localhost:5173"],
    origin: "https://ridebnb-frontend.onrender.com/",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.options("*", cors());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.set("trust proxy", 1);

app.use("/auth", AuthRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/user", UserRoute);
app.use("/search", SearchRoute);
app.use("/comment", CommentRoute);
app.use("/booking", BookingRoute);
app.use("/chat", MessageRoute);
app.use("/notification", NotificationRoute);
app.use("/cloudinary", CloudinaryRoute);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:5173",
    origin: "https://ride-bnb.vercel.app",

    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const addNewUser = async (socketId, user) => {
  if (user.user) {
    const { customer_id, customername } = user.user;

    const checkUser = await pool.query(
      "SELECT * FROM online_users WHERE customer_id = $1",
      [customer_id]
    );

    if (checkUser.rows.length > 0) {
      const updateSocketId = await pool.query(
        "UPDATE online_users SET socket_id = $1 WHERE customer_id = $2 RETURNING *",
        [socketId, customer_id]
      );
    } else {
      try {
        const insertUser = await pool.query(
          "INSERT INTO online_users (socket_id, customer_id, customer_name) VALUES ($1, $2, $3) RETURNING *",
          [socketId, customer_id, customername]
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
};

const getSocketId = async (userId) => {
  try {
    const socketId = await pool.query(
      "SELECT socket_id FROM online_users WHERE customer_id = $1",
      [userId]
    );

    if (socketId.rows.length === 0) {
      return null;
    }

    return socketId.rows[0].socket_id;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (socketId) => {
  try {
    const deleteUser = await pool.query(
      "DELETE FROM online_users WHERE socket_id = $1",
      [socketId]
    );
    return deleteUser.rows[0];
  } catch (error) {
    console.log(error);
  }
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("newUser", (user) => {
    addNewUser(socket.id, user);
    // console.log(user.user.customer_id);
  });

  socket.on("notify", (data) => {
    getSocketId(data.receiver_id).then((socketId) => {
      console.log(socketId);
      io.to(socketId).emit("notify", data);
    });
  });

  socket.on("notifyBooking", (data) => {
    getSocketId(data.receiver_id).then((socketId) => {
      console.log(socketId);
      io.to(socketId).emit("notifyBooking", data);
    });
  });

  const bookingId = socket.handshake.query.booking_id;
  socket.join(bookingId);

  socket.on("newMessage", (message) => {
    console.log(message);
    io.to(bookingId).emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    deleteUser(socket.id);
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
