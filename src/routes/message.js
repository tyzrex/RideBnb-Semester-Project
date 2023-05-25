import express from "express";
const router = express.Router();

import { createMessage, getMessages } from "../controllers/message.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

router.route("/createMessage").post(isAuthenticated, createMessage);
router.route(`/getMessage`).get(isAuthenticated, getMessages);

export default router;
