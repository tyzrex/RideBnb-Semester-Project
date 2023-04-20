import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/database.js";

dotenv.config();

export const getUserInfo = async (req, res) => {
  const user = req.user;
  const { customer_id } = user;
  try {
    const userInfo = await pool.query(
      "Select customername, email, address, phone_number FROM customer WHERE customer_id = $1",
      [customer_id]
    );
    res.status(200).json(userInfo.rows);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const editProfile = async (req, res) => {
  const { name, email, new_password, address, phone } = req.body;
  const user = req.user;
  const { customer_id } = user;
  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(new_password, salt);
    const editUser = await pool.query(
      "UPDATE customer SET customername = $1, email = $2, password = $3, address = $4, phone_number = $5 WHERE customer_id = $6",
      [name, email, bcryptPassword, address, phone, customer_id]
    );
    res.status(200).json("User updated");
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  const user = await pool.query("SELECT * FROM customer");
  res.status(200).json(user.rows);
};
