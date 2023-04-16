import express from "express";
const router = express.Router();
import { post,getPosts } from "../controllers/post.js";
import {isAuthenticated} from '../middleware/isAuthenticated.js';

// post vehicle
router.route("/listvehicle").post(isAuthenticated,post);

//route for getting all posts
router.route("/getposts").get(getPosts);

export default router;

