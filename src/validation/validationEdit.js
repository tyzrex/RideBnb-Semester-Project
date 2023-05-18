import pool from "../config/database.js";
import { check } from "express-validator";

// checking for profile updating of users

// check user name to see if there is already an entry

const username = check("name")
  .notEmpty()
  .withMessage("Field cannot be empty")
  .isAlphanumeric()
  .withMessage("Username should be alphanumeric");

const email = check("email")
  .isEmail()
  .withMessage("Please enter a valid email")
  .notEmpty()
  .withMessage("Field cannot be empty")
  .normalizeEmail();

const address = check("address")
  .isAlphanumeric()
  .withMessage("Address should be alphanumeric")
  .notEmpty()
  .withMessage("Field cannot be empty");

const phone = check("phone")
  .isMobilePhone()
  .withMessage("Enter valid phone number")
  .notEmpty()
  .withMessage("Field cannot be empty");

export const editProfileValidation = [username, email, address, phone];
