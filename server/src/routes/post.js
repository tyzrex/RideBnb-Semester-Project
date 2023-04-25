import express from "express";
const router = express.Router();
import {
  post,
  getPosts,
  getPost,
  getPostByType,
  rateVehicle,
  getRating,
  getRatingByUser,
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
router.route("/getpostbytype/:type").get(getPostByType);

//route for rating a vehicle
router.route("/ratevehicle").post(isAuthenticated, rateVehicle);

//route for getting rating of a vehicle
router.route("/getrating/:id").get(getRating);

//route for getting rating of a vehicle by a user
router.route("/getratingbyuser/:id").get(isAuthenticated, getRatingByUser);

export default router;
