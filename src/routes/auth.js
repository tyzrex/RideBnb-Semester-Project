import express from "express";
const router = express.Router();
import { register,login,logout } from "../controllers/auth.js";
import { registerValidation,loginValidation } from "../validation/validateRegister.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";

// register
router.route("/register").post(registerValidation,validationMiddleware,register);

//route for login
router.route("/login").post(loginValidation,validationMiddleware,login);
// router.route("/login").post(login);

//route for logout
router.route("/logout").post(logout);


export default router;

