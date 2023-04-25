import express from "express";
const router = express.Router();
import { createBooking } from "../controllers/booking.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isBooked } from "../middleware/isBooked.js";

// Create a booking
router.route("/createBooking").post(isAuthenticated, isBooked, createBooking);

export default router;
