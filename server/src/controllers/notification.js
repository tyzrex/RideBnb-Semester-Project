import pool from "../config/database.js";

export const getNotifications = async (req, res) => {
  try {
    const { customer_id } = req.user;
    const notifications = await pool.query(
      "SELECT * FROM notifications WHERE receiver_id = $1",
      [customer_id]
    );
    res.json(notifications.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const createNotification = async (req, res) => {
  try {
    const { sender_id, receiver_id, notification_message } = req.body;
    const { customername } = req.user;
    console.log(req.body);
    const newNotification = await pool.query(
      "INSERT INTO notifications (sender_id,sender_name, receiver_id, notification_message) VALUES($1, $2, $3, $4) RETURNING *",
      [sender_id, customername, receiver_id, notification_message]
    );
    res.json(newNotification.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};
