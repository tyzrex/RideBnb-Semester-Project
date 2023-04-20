import express from "express";
const router = express.Router();
import { editProfile } from "../controllers/editProfile.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

// edit profile
router.route("/editprofile/:id").put(isAuthenticated,editProfile);

export default router;
