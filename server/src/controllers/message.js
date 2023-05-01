import pool from "../config/database.js";

export const createMessage = async (req, res) => {
  const { user } = req;
  const { customer_id, customername } = user;
  const { booking_id, message } = req.body;

  const vehiclePostResult = await pool.query(
    "SELECT customer_id FROM vehicle_post WHERE vehicle_post_id = (SELECT vehicle_post_id FROM booking WHERE booking_id = $1)",
    [booking_id]
  );
  const receiver_id = vehiclePostResult.rows[0].customer_id;

  try {
    const messageResult = await pool.query(
      "INSERT INTO chat_message (sender_id, receiver_id, message_text, booking_id, sender_name) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [customer_id, receiver_id, message, booking_id, customername]
    );
    const newMessage = messageResult.rows[0];

    return res.status(200).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create message" });
  }
};

export const getMessages = async (req, res) => {
  const { booking_id } = req.query;
  console.log(req.query);

  try {
    const messagesResult = await pool.query(
      "SELECT * FROM chat_message WHERE booking_id = $1 ORDER BY message_id ASC;",
      [booking_id]
    );
    const messages = messagesResult.rows;

    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get messages" });
  }
};
