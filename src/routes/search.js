import express from "express";
const router = express.Router();

import { searchVehicle } from "../controllers/search.js";

// @route   GET /search
// @desc    Search for a vehicle
// @access  Public
// router.post("/searchVehicle", searchVehicle);

router.get("/searchVehicle", searchVehicle);

export default router;
