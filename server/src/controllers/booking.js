import pool from "../config/database.js";

export const createBooking = async (req, res) => {
  try {
    const { vehicle_post_id, checkIn, checkOut, total_price } = req.body;

    const owner_id = await pool.query(
      `SELECT customer_id FROM vehicle_post WHERE vehicle_post_id = $1`,
      [vehicle_post_id]
    );

    const vehicle_owner_id = owner_id.rows[0].customer_id;

    console.log(req.body);
    const numDays = Math.abs(
      Math.ceil(
        (new Date(checkIn) - new Date(checkOut)) / (1000 * 60 * 60 * 24)
      )
    );
    const total_cost = numDays * total_price;
    const queryText = `
        INSERT INTO booking (vehicle_post_id, booking_customer_id, start_date, end_date, total_cost, total_price , owner_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `;
    const values = [
      vehicle_post_id,
      req.user.customer_id,
      checkIn,
      checkOut,
      total_cost,
      total_price,
      vehicle_owner_id,
    ];
    const { rows } = await pool.query(queryText, values);
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBookingById = async (req, res) => {
  const user = req.user;
  const { customer_id } = user;
  try {
    const { rows } = await pool.query(
      ` SELECT *,vp.* FROM booking b INNER JOIN vehicle_post vp ON vp.vehicle_post_id = b.vehicle_post_id WHERE b.booking_customer_id = $1`,
      [customer_id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const bookedByUser = async (req, res) => {
  const { vehicle_post_id } = req.query;
  const { customer_id } = req.user;

  // check if the user has already booked the vehicle post

  try {
    const { rows } = await pool.query(
      `SELECT * FROM booking WHERE vehicle_post_id = $1 AND booking_customer_id = $2`,
      [vehicle_post_id, customer_id]
    );
    if (rows.length > 0) {
      return res.status(400).json({ message: "Booked" });
    }
    return res.status(200).json({ message: "Not booked" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//get owner vehicles which are listed in the booking table
export const getOwnerVehicles = async (req, res) => {
  const { customer_id } = req.user;

  try {
    const query = `SELECT b.*, vp.vehicle_name, vp.vehicle_image, c.customername FROM booking b INNER JOIN vehicle_post vp ON vp.vehicle_post_id = b.vehicle_post_id INNER JOIN customer c ON c.customer_id = b.booking_customer_id WHERE b.owner_id = $1;`;
    const { rows } = await pool.query(query, [customer_id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// accept and reject booking
export const bookingAction = async (req, res) => {
  const { booking_id } = req.params;
  const { action } = req.body;
  const { customer_id } = req.user;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM booking WHERE booking_id = $1 AND owner_id = $2`,
      [booking_id, customer_id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const query = `UPDATE booking SET status = $1 WHERE booking_id = $2 RETURNING *`;
    const values = [action, booking_id];
    const response = await pool.query(query, values);
    return res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
