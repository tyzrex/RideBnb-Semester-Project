import dotenv from "dotenv";
import pool from "../config/database.js";
import jwt from "jsonwebtoken";

dotenv.config();

export const post = async (req, res) => {
  const {
    vehicleName,
    vehicleType,
    vehicleMakeYear,
    vehicleBrand,
    address,
    vehicleColor,
    pricePerDay,
    vehicleDescription,
    vehiclefile,
  } = req.body;
  const user = req.user;
  const { customer_id } = user;
  try {
    const newPost = await pool.query(
      "INSERT INTO vehicle_post (vehicle_name, vehicle_type, vehicle_year ,vehicle_brand, address,vehicle_color, price_per_day , vehicle_description, vehicle_image, customer_id) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [
        vehicleName,
        vehicleType,
        vehicleMakeYear,
        vehicleBrand,
        address,
        vehicleColor,
        pricePerDay,
        vehicleDescription,
        vehiclefile,
        customer_id,
      ]
    );
    res.status(200).json("Vehicle posted");
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// export const getPosts = async (req, res) => {
//   try {
//     const posts = await pool.query("SELECT vehicle_post.*, customer.customername FROM vehicle_post INNER JOIN customer ON vehicle_post.customer_id = customer.customer_id");
//     res.status(200).json(posts.rows);
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({
//       success: false,
//       message: err.message,
//     });
//   }
// }

// Route to get posts with pagination
// Route to get posts with pagination
export const getPosts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const { rows } = await pool.query(
      `SELECT vehicle_post.*, customer.customername FROM vehicle_post INNER JOIN customer ON vehicle_post.customer_id = customer.customer_id ORDER BY vehicle_post.created_at DESC LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    );
    const totalPosts = await pool.query("SELECT COUNT(*) FROM vehicle_post");
    const totalPages = Math.ceil(totalPosts.rows[0].count / limit);

    res.status(200).json({
      posts: rows,
      totalPages,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await pool.query(
      "SELECT * FROM vehicle_post WHERE vehicle_id = $1",
      [id]
    );
    res.status(200).json(post.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
