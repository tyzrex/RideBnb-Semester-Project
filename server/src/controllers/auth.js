import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/database.js";

dotenv.config();

export const register = async (req, res) => {
  const { name, email, password, address, phone } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    console.log(bcryptPassword);
    const newUser = await pool.query(
      "INSERT INTO customer (customername, email, password,address,phone_number) VALUES ($1, $2, $3,$4,$5) RETURNING *",
      [name, email, bcryptPassword, address, phone]
    );
    res.status(200).json("User registered");
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await pool.query(
      "SELECT * FROM customer WHERE customername = $1",
      [name]
    );
    if (user.rowCount === 0) {
      throw new Error("User does not exist");
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      throw new Error("Incorrect username or password");
    }
    console.log(user.rows[0].customer_id);
    const token = jwt.sign(
      { id: user.rows[0].customer_id },
      process.env.JWT_SECRET
    );
    const { password: userPassword, ...others } = user.rows[0];
    res
      .cookie("session_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: "ride-bnb.vercel.app",
      })
      .status(200)
      .json(others);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("session_token", {
    sameSite: "none",
    secure: true,
  });
  res.status(200).json("Logged out");
};

// export const logout = async(req, res) => {
//   const token = req.cookies.session_token;
//   console.log(token);
//   // Verify and decode the token
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       // Handle invalid or expired token
//       return res.status(401).json({
//         message: 'Invalid or expired token'
//       });
//     }

//     // Delete the JWT token cookie
//     res.clearCookie('session_token', {
//       httpOnly: true,
//       sameSite: 'strict'
//     });

//     // Send a response with success message
//     res.status(200).json({
//       message: 'Successfully logged out'
//     });
//   });

// }
