import express from "express";
const router = express.Router();
import { createBooking, getBookingById } from "../controllers/booking.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isBooked } from "../middleware/isBooked.js";

// Create a booking
router.route("/createBooking").post(isAuthenticated, isBooked, createBooking);

//Get booking for a user
router.route("/getBookingById").get(isAuthenticated, getBookingById);

export default router;
