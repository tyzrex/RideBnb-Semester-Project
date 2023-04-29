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
    listingType,
    features,
    numberPlate,
  } = req.body;
  console.log(req.body);
  const user = req.user;
  console.log(user);
  const { customer_id } = user;
  try {
    const newPost = await pool.query(
      "INSERT INTO vehicle_post (vehicle_name, vehicle_type, vehicle_year ,vehicle_brand, address,vehicle_color, price_per_day , vehicle_description, vehicle_image, customer_id, vehicle_listing_type, vehicle_features, vehicle_number) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
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
        listingType,
        features,
        numberPlate,
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

export const getPostByType = async (req, res) => {
  const { type } = req.params;
  console.log(type);
  try {
    const { rows } = await pool.query(
      `SELECT
      vp.vehicle_post_id,
      vp.vehicle_name,
      vp.price_per_day,
      vp.vehicle_image,
      vp.address,
      customer.customername,r.avg_rating 
      FROM vehicle_post vp
      INNER JOIN customer ON vp.customer_id = customer.customer_id 
      LEFT JOIN (
        SELECT vehicle_post_id, AVG(rating) AS avg_rating
        FROM vehicle_post_comment
        GROUP BY vehicle_post_id
      ) r ON vp.vehicle_post_id = r.vehicle_post_id
      WHERE vehicle_listing_type = $1  
      ORDER BY vp.created_at DESC `,
      [type]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await pool.query(
      // "SELECT * FROM vehicle_post WHERE vehicle_post_id = $1",
      `SELECT 
        vp.*, 
        c.customername, 
        c.email, 
        COALESCE(r.avg_rating, 0) AS avg_rating
      FROM vehicle_post vp
      JOIN customer c ON vp.customer_id = c.customer_id
      LEFT JOIN (
        SELECT vehicle_post_id, AVG(rating) AS avg_rating
        FROM vehicle_post_comment
        GROUP BY vehicle_post_id
      ) r ON vp.vehicle_post_id = r.vehicle_post_id
      WHERE vp.vehicle_post_id = $1;
      `,
      [id]
    );
    if (post.rows.length === 0) {
      throw new Error("Post not found");
    }
    res.status(200).json(post.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
