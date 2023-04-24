import pool from "../config/database.js";
import io from "../../server.js";

export const createComment = async (req, res) => {
  const user = req.user;
  const { customer_id } = user;
  const { customername } = user;
  const { vehicle_post_id, comment } = req.body;
  try {
    const res = await pool.query(
      "INSERT INTO vehicle_post_comment (vehicle_post_id, customer_id, comment_text,customer_name) VALUES ($1, $2, $3,$4) RETURNING *;",
      [vehicle_post_id, customer_id, comment, customername]
    );

    const newComment = res.rows[0];
    newComment.customername = customername;
    console.log(newComment);

    // Emit the newComment event to notify connected clients
    io.emit("newComment", newComment);

    return newComment;
  } catch (err) {
    console.error(err);
  }
};

export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM vehicle_post_comment WHERE vehicle_post_id = $1 ORDER BY created_at DESC;",
      [id]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
  }
};
