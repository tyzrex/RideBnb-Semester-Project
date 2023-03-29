import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from '../config/database.js';

import asyncHandler from "express-async-handler";

dotenv.config();

export const register = asyncHandler(async (req,res)=> {
    const { name, email, password, address, phone } = req.body;
    console.log(req.body);

    const user = await pool.query(
        "SELECT * FROM customer WHERE email = $1",
        [email]
    );
    if (user.rows.length !== 0) {
        res.status(409);
        throw new Error("User already exists");
    } else {
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log(bcryptPassword);
        const newUser = await pool.query(
            "INSERT INTO customer (customername, email, password,address,phone_number) VALUES ($1, $2, $3,$4,$5) RETURNING *",
            [name, email, bcryptPassword,address,phone]);
        res.status(200).json("User registered");
    }
});

export const login = asyncHandler(async (req,res) => {
    const { name } = req.body;
    const user = await pool.query(
        "SELECT * FROM customer WHERE username = $1",
        [name]
    );
    if (user.rows.length === 0) {
        res.status(401);
        throw new Error("User does not exist");
    }
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.rows[0].password
    );
    if (!validPassword) {
        res.status(409);
        throw new Error("Incorrect username or password");
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
    const { password, ...others } = user.rows[0];

    res
        .cookie("access_token", token, {
            httpOnly: true,
            sameSite: true,
        })
        .status(200)
        .json(others);
})

export const logout = async (req, res) =>{
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    });
    res.status(200).json("Logged out");
};

export const getAllUsers = async (req,res) => {
    const user = await pool.query("SELECT * FROM customer");
    res.status(200).json(user.rows);
};




