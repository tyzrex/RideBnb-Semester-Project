import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getUserInfo, getAllUsers, editProfile } from "../controllers/users.js";
const router = express.Router();

//make an api to get user info
router.route("/getUserInfo").get(isAuthenticated, getUserInfo);

//get all users
router.route("/getusers").get(getAllUsers);

//edit profile
router.route("/editprofile").put(isAuthenticated, editProfile);

export default router;
