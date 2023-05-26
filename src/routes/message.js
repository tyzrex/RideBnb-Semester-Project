import express from "express";
const router = express.Router();

import {
  createMessage,
  getMessages,
  createChatRoom,
  getChatTwoUsers,
  getUserChatRooms,
  checkUserOnline,
  searchForUser,
} from "../controllers/message.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

router.route("/createMessage").post(isAuthenticated, createMessage);
router.route(`/getMessage`).get(isAuthenticated, getMessages);
router.route("/createChatRoom").post(isAuthenticated, createChatRoom);
router.route("/getChatTwoUsers").get(isAuthenticated, getChatTwoUsers);
router.route("/getUserChatRooms").get(isAuthenticated, getUserChatRooms);
router.route("/checkUserOnline").get(isAuthenticated, checkUserOnline);

export default router;
