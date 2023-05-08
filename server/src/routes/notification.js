import express from "express";
import {
  getNotifications,
  createNotification,
} from "../controllers/notification.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// @route   GET /getNotifications
router.get("/getNotifications", isAuthenticated, getNotifications);

// @route   POST /createNotification
router.post("/createNotification", isAuthenticated, createNotification);

export default router;
