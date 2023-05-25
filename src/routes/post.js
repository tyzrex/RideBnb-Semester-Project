import express from "express";
const router = express.Router();
import {
  post,
  getPosts,
  getPost,
  getPostByType,
  getPostByUser,
} from "../controllers/post.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { validateVehiclePost } from "../validation/validationList.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";

// post vehicle
router
  .route("/listvehicle")
  .post(isAuthenticated, validateVehiclePost(), validationMiddleware, post);

//route for getting all posts
router.route("/getposts").get(getPosts);

//route for getting a single post
router.route("/getpost/:id").get(getPost);

//route for getting posts by type
router.route("/getpostbytype").get(getPostByType);

//get posts by user
router.route("/getpostsbyuser").get(isAuthenticated, getPostByUser);

export default router;
