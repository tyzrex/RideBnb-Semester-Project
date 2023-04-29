import pool from "../config/database.js";

export const searchVehicle = async (req, res) => {
  const { location, checkIn, checkOut, vehicleType, listingType } = req.query;
  try {
    const query = `
      SELECT 
        vp.vehicle_name, 
        vp.vehicle_post_id,
        vp.vehicle_type, 
        vp.price_per_day, 
        vp.vehicle_image, 
        vp.address, 
        vp.vehicle_listing_type, 
        vp.vehicle_color,
        vp.vehicle_brand,
        c.customername
      FROM vehicle_post vp
      JOIN customer c ON vp.customer_id = c.customer_id
      WHERE vp.address ILIKE $1
        AND vp.vehicle_type = $2
        AND vp.available = true
        AND NOT EXISTS (
          SELECT *
          FROM booking b
          WHERE b.vehicle_post_id = vp.vehicle_post_id
            AND (b.start_date::date, b.end_date::date) OVERLAPS ($3::date, $4::date)
        )
    `;
    const values = [`%${location}%`, vehicleType, checkIn, checkOut];
    const { rows } = await pool.query(query, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const checkBookingOverlap = async (req, res) => {
  try {
    console.log(req.body);
    const { vehicle_post_id, checkIn, checkOut } = req.body;
    const query = `
      SELECT *
      FROM booking
      WHERE vehicle_post_id = $1
        AND (start_date::date, end_date::date) OVERLAPS ($2::date, $3::date)
    `;
    const values = [vehicle_post_id, checkIn, checkOut];
    const { rows } = await pool.query(query, values);
    if (rows.length > 0) {
      res.status(200).json({ overlap: true });
    }
    res.status(200).json({ overlap: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
