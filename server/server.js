import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import AuthRoute from "./src/routes/auth.js";
import PostRoute from "./src/routes/post.js";
import multer from "multer";

// import UploadRoute from './src/routes/multerImage.js';

const app = express();
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
app.options('*', cors()) 

app.use("/auth", AuthRoute);
app.use("/post", PostRoute);
// app.use('/upload', UploadRoute)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.post('/image', upload.single('file'), function (req, res) {
  res.send(req.file)
})

app.listen(port, () => {
  console.log(`Rental app listening at http://localhost:${port}`);
});

