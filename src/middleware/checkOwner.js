import pool from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

export async function checkOwner(req, res, next) {
  const { vehicle_post_id } = req.body;
  const { customer_id } = req.user;
  try {
    const queryText = `SELECT vehicle_post_id FROM vehicle_post WHERE vehicle_post_id = $1 AND customer_id = $2`;
    const values = [vehicle_post_id, customer_id];
    const { rows } = await pool.query(queryText, values);
    if (rows.length > 0) {
      return res.status(400).json({
        message: "You cannot book your own vehicle post",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
