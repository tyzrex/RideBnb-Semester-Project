import dotenv from "dotenv";
import pool from "../config/database.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    const file = req.files.vehiclefile;

    const { secure_url } = await cloudinary.uploader.upload(
      file.tempFilePath,
      (err, result) => {
        if (err) throw err;
        console.log(result);
      }
    );
    res.status(200).json({ url: secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
  const user = req.user;
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
  const { listingType, user_id } = req.query;
  try {
    let query = `SELECT
    vp.vehicle_post_id,
    vp.vehicle_name,
    vp.price_per_day,
    vp.vehicle_image,
    vp.address,
    customer.customername,
    r.avg_rating 
    FROM vehicle_post vp
    INNER JOIN customer ON vp.customer_id = customer.customer_id 
    LEFT JOIN (
      SELECT vehicle_post_id, AVG(rating) AS avg_rating
      FROM vehicle_post_comment
      GROUP BY vehicle_post_id
    ) r ON vp.vehicle_post_id = r.vehicle_post_id
    WHERE vehicle_listing_type = $1`;

    let params = [listingType];

    if (user_id) {
      query += ` AND vp.customer_id != $2`;
      params.push(user_id);
    }

    query += ` ORDER BY r.avg_rating DESC NULLS LAST LIMIT 4`;

    const { rows } = await pool.query(query, params);
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

export const getPostByUser = async (req, res) => {
  const { customer_id } = req.user;
  console.log(customer_id);
  try {
    const post = await pool.query(
      `SELECT 
        vp.*, 
        COALESCE(r.avg_rating, 0) AS avg_rating
      FROM vehicle_post vp
      LEFT JOIN (
        SELECT vehicle_post_id, AVG(rating) AS avg_rating
        FROM vehicle_post_comment
        GROUP BY vehicle_post_id
      ) r ON vp.vehicle_post_id = r.vehicle_post_id
      WHERE vp.customer_id = $1;
      `,
      [customer_id]
    );
    if (post.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "No posts found",
      });
    } else {
      res.status(200).json(post.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { customer_id } = req.user;
  try {
    const post = await pool.query(
      "DELETE FROM vehicle_post WHERE vehicle_post_id = $1 AND customer_id = $2 RETURNING *",
      [id, customer_id]
    );
    res.status(200).json("Post deleted");
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
