import pool from "../config/database.js";

export const createMessage = async (req, res) => {
  const { user } = req;
  const { customer_id, customername } = user;
  const { receiver_id, message_text, conversation_id } = req.body;

  try {
    const messageResult = await pool.query(
      "INSERT INTO chat_message (sender_id, receiver_id, message,conversation_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      [customer_id, receiver_id, message_text, conversation_id]
    );
    const newMessage = messageResult.rows[0];

    return res.status(200).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create message" });
  }
};

export const getMessages = async (req, res) => {
  const { conversation_id } = req.query;

  try {
    const messagesResult = await pool.query(
      "SELECT * FROM message WHERE conversation_id = $1;",
      [conversation_id]
    );
    const messages = messagesResult.rows;

    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get messages" });
  }
};

export const createChatRoom = async (req, res) => {
  const { user } = req;
  const { customer_id } = user;
  const member_1 = customer_id;
  const { member_2 } = req.body;

  const members = [member_1, member_2];

  //check if chat room already exists
  const chatRoomResult = await pool.query(
    "SELECT * FROM conversation WHERE members = $1;",
    [members]
  );
  const chatRoom = chatRoomResult.rows[0];
  if (chatRoom) {
    return res.status(200).json({
      message: "Chat room already exists",
      chatRoom,
    });
  }

  try {
    const chatRoomResult = await pool.query(
      //insert to member array
      "INSERT INTO conversation (members) VALUES ( $1 ) RETURNING *;",
      [members]
    );
    const newChatRoom = chatRoomResult.rows[0];
    return res.status(200).json(newChatRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create chat room" });
  }
};

export const getUserChatRooms = async (req, res) => {
  const { user } = req;
  const { customer_id } = user;

  try {
    const chatRoomsResult = await pool.query(
      "SELECT * FROM conversation WHERE $1 = ANY (members);",
      [customer_id]
    );
    const chatRooms = chatRoomsResult.rows;

    //get the user details of the other member
    for (let i = 0; i < chatRooms.length; i++) {
      const chatRoom = chatRooms[i];
      const members = chatRoom.members;
      const otherMemberId = members.find((member) => member !== customer_id);

      const otherMemberResult = await pool.query(
        "SELECT customer_id,customername FROM customer WHERE customer_id = $1;",
        [otherMemberId]
      );
      const otherMember = otherMemberResult.rows[0];
      chatRoom.receiver_name = otherMember;
    }

    return res.status(200).json(chatRooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get chat rooms" });
  }
};

export const getChatTwoUsers = async (req, res) => {
  const { user } = req;
  const { customer_id } = user;
  const sender_id = customer_id;
  const { receiver_id } = req.query;

  try {
    const chatRoomResult = await pool.query(
      "SELECT * FROM conversation WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1);",
      [sender_id, receiver_id]
    );
    const chatRoom = chatRoomResult.rows[0];

    return res.status(200).json(chatRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get chat room" });
  }
};
