import pool from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

export async function isBooked(req, res, next) {
  const { vehicle_post_id, checkIn, checkOut } = req.body;
  try {
    // Check if the vehicle post has already been booked for the specified dates
    const queryText = `
      SELECT * FROM booking
      WHERE vehicle_post_id = $1 AND
            ((start_date >= $2 AND start_date <= $3) OR
             (end_date >= $2 AND end_date <= $3) OR
             (start_date <= $2 AND end_date >= $3))
    `;
    const values = [vehicle_post_id, checkIn, checkOut];
    const { rows } = await pool.query(queryText, values);

    if (rows.length > 0) {
      return res.status(400).json({
        message:
          "This vehicle post has already been booked for the specified dates",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
