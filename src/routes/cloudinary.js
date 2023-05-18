import express from "express";
const router = express.Router();

import { uploadImage } from "../controllers/cloudinary.js";

//upload the vehicle image in the post to the server
router.route("/uploadImage").post(uploadImage);

export default router;
