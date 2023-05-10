import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();

// const pool = new Pool({
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT || "5432",
//   database: process.env.PG_DATABASE,
// });

const devConfig = process.env.DEPLOY_DB_SETTINGS;

const pool = new Pool({
  connectionString: devConfig,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
