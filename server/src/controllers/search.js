import pool from "../config/database.js";

export const searchVehicle = async (req, res) => {
  const { location, checkIn, checkOut, vehicleType, listingType } = req.query;
  console.log(req.body);
  try {
    const query = `
      SELECT 
  vp.vehicle_name, 
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

    `;
    const values = [`%${location}%`, vehicleType];
    const { rows } = await pool.query(query, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
