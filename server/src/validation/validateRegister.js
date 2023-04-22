import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { check } from "express-validator";

// registration check

// check password
const password = check("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password has to be between 6 and 15 characters");

// email validation and
// check if email already exists
const email = check("email")
  .isEmail()
  .withMessage("Please enter a valid email.")
  .normalizeEmail()
  .custom(async (value) => {
    const { rows } = await pool.query(
      "SELECT * FROM customer WHERE email = $1",
      [value]
    );
    if (rows.length != 0) {
      throw new Error("User already exists");
    }
  });

// check if username is entered or not and if it is already in use
const username = check("name")
  .isLength({ min: 3 })
  .withMessage("Please enter a valid username")
  .custom(async (value) => {
    const { rows } = await pool.query(
      "SELECT * FROM customer WHERE customername = $1",
      [value]
    );
    if (rows.length > 0) {
      throw new Error("Username already in use");
    }
  });

// login validation
const loginFieldCheck = check("name").custom(async (value, { req }) => {
  const user = await pool.query(
    "SELECT * FROM customer WHERE customername = $1",
    [value]
  );
  if (user.rows.length === 0) {
    throw new Error("Name not found");
  }

  const isMatch = await bcrypt.compare(
    req.body.password,
    user.rows[0].password
  );
  if (!isMatch) {
    throw new Error("Password is incorrect");
  }
  req.user = user.rows[0];
});

export const registerValidation = [password, email, username];
export const loginValidation = [loginFieldCheck];
