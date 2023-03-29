import express from "express";
const router = express.Router();
import { register,login,logout,getAllUsers } from "../controllers/auth.js";
import { validateUserDetails } from "../validation/validateRegister.js";

// register
router.route("/register").post(register,validateUserDetails);

//route for login
router.route("/login").post(login);

//route for logout
router.route("/logout").post(logout);

//make an api to get all user data
router.route("/user").get(getAllUsers);

export default router;

