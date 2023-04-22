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

// export const editProfile = async (req, res) => {
//   const { name, email, new_password, address, phone } = req.body;
//   const user = req.user;
//   const { customer_id } = user;
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const bcryptPassword = await bcrypt.hash(new_password, salt);
//     const editUser = await pool.query(
//       "UPDATE customer SET customername = $1, email = $2, password = $3, address = $4, phone_number = $5 WHERE customer_id = $6",
//       [name, email, bcryptPassword, address, phone, customer_id]
//     );
//     res.status(200).json("User updated");
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

export const editProfile = async (req, res) => {
  const { name, email, new_password, address, phone } = req.body;
  const user = req.user;
  const { customer_id } = user;
  // if the username is same to the previous one then dont throw an error but if it is same to other username then throw an error

  const checkUsername = await pool.query(
    "SELECT * FROM customer WHERE customername = $1 AND customer_id != $2",
    [name, customer_id]
  );

  if (checkUsername.rows.length > 0) {
    return res.status(403).json({
      success: false,
      message: "Username already exists",
    });
  }

  try {
    let params = [name, email, address, phone, customer_id];
    let query =
      "UPDATE customer SET customername = $1, email = $2, address = $3, phone_number = $4 WHERE customer_id = $5";
    if (new_password) {
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(new_password, salt);
      query =
        "UPDATE customer SET customername = $1, email = $2, password = $3, address = $4, phone_number = $5 WHERE customer_id = $6";
      params.splice(2, 0, bcryptPassword);
    }
    const editUser = await pool.query(query, params);
    res.status(200).json("User updated");
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUser = async (req, res) => {
  const user = req.user;
  const { customer_id } = user;
  try {
    const userInfo = await pool.query(
      "Select * FROM customer WHERE customer_id = $1",
      [customer_id]
    );
    const { password, ...rest } = userInfo.rows[0];
    res.cookie("user", rest, {
      httpOnly: true,
    });
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = async (req, res) => {
  const user = await pool.query("SELECT * FROM customer");
  res.status(200).json(user.rows);
};
