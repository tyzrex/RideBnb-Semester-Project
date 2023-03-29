import pkg from "pg";
import dotenv from "dotenv";
const {Pool} = pkg;
dotenv.config();

// const pool = new Pool({
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     host: process.env.POSTGRES_HOST,
//     port: process.env.POSTGRES_PORT || "5432",
//     database: process.env.POSTGRES_DB,
// });

const pool = new Pool({
    user: "postgres",
    password: "sulav123",
    host: "localhost",
    port: "5432",
    database: "ridebnb",
});

export default pool;