import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  getUserInfo,
  getAllUsers,
  editProfile,
  getUser,
} from "../controllers/users.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { editProfileValidation } from "../validation/validationEdit.js";
const router = express.Router();

//make an api to get user info
router.route("/getUserInfo").get(isAuthenticated, getUserInfo);

//get all users
router.route("/getusers").get(getAllUsers);

//edit profile
router
  .route("/editprofile")
  .put(
    isAuthenticated,
    editProfileValidation,
    validationMiddleware,
    editProfile
  );

//get user
router.route("/getUser").get(isAuthenticated, getUser);

export default router;
