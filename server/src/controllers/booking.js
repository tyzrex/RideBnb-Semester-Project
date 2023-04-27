import pool from "../config/database.js";

export const createBooking = async (req, res) => {
  try {
    const { vehicle_post_id, checkIn, checkOut, total_price } = req.body;
    console.log(req.body);
    const numDays = Math.abs(
      Math.ceil(
        (new Date(checkIn) - new Date(checkOut)) / (1000 * 60 * 60 * 24)
      )
    );
    const total_cost = numDays * total_price;
    const queryText = `
        INSERT INTO booking (vehicle_post_id, customer_id, start_date, end_date, total_cost, total_price)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `;
    const values = [
      vehicle_post_id,
      req.user.customer_id,
      checkIn,
      checkOut,
      total_cost,
      total_price,
    ];
    const { rows } = await pool.query(queryText, values);
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookings = async (req, res) => {
  try {
    const queryText = `
        SELECT * FROM booking
        WHERE customer_id = $1
        `;
    const { rows } = await pool.query(queryText, [req.user.customer_id]);
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookingById = async (req, res) => {
  const user = req.user;
  const { customer_id } = user;
  try {
    const queryText = `
        SELECT * FROM booking
        WHERE customer_id = $1
        `;
    const { rows } = await pool.query(queryText, customer_id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
