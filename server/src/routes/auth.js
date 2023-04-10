import express from "express";
const router = express.Router();
import { register,login,logout,getAllUsers } from "../controllers/auth.js";
import { registerValidation,loginValidation } from "../validation/validateRegister.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";

// register
router.route("/register").post(registerValidation,validationMiddleware,register);

//route for login
router.route("/login").post(loginValidation,validationMiddleware,login);

//route for logout
router.route("/logout").post(logout);

//make an api to get all user data
router.route("/user").get(getAllUsers);

export default router;

