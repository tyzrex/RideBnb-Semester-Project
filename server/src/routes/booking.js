import express from "express";
const router = express.Router();
import {
  createBooking,
  getBookingById,
  bookedByUser,
  getOwnerVehicles,
} from "../controllers/booking.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isBooked } from "../middleware/isBooked.js";
import { checkOwner } from "../middleware/checkOwner.js";

// Create a booking
router
  .route("/createBooking")
  .post(isAuthenticated, checkOwner, isBooked, createBooking);

//Get booking for a user
router.route("/getBookingById").get(isAuthenticated, getBookingById);

//Check if a user has already booked a vehicle post
router.route("/bookedByUser").get(isAuthenticated, bookedByUser);

//Get owner vehicles which are listed in the booking table
router.route("/getOwnerVehicles").get(isAuthenticated, getOwnerVehicles);

export default router;
