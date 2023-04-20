import express from "express";
const router = express.Router();
import { post, getPosts, getPost, getPostByType } from "../controllers/post.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

// post vehicle
router.route("/listvehicle").post(isAuthenticated, post);

//route for getting all posts
router.route("/getposts").get(getPosts);

//route for getting a single post
router.route("/getpost/:id").get(getPost);

//route for getting posts by type
router.route("/getpostbytype/:type").get(getPostByType);

export default router;
