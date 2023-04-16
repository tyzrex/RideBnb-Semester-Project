import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import dotenv from 'dotenv';
dotenv.config();

export async function isAuthenticated(req, res, next) {
  try {
    const token = req.cookies.session_token;
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decodedToken;
    const { rows: [user] } = await pool.query('SELECT * FROM customer WHERE customer_id = $1', [id]);
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    const passwordChanged = user.passwordChangedAt ? user.passwordChangedAt.getTime() / 1000 > decodedToken.iat : false;
    if (passwordChanged) {
      return res.status(401).send('Unauthorized');
    }
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized');
  }
}
