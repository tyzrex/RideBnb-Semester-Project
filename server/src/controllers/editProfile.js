import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../config/database.js';

dotenv.config();

export const editProfile = async (req, res) => {
    const {name , email, password, address, phone} = req.body;
    const user = req.user;
    const {customer_id} = user;
    try{
        const editUser = await pool.query(
            "UPDATE customer SET customername = $1, email = $2, password = $3, address = $4, phone_number = $5 WHERE customer_id = $6",
            [name, email, password, address, phone, customer_id]
        );
        res.status(200).json("User updated");
    }catch(err){
        console.log(err);
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}