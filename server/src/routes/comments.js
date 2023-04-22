import express from "express";
const router = express.Router();

import { createComment } from "../controllers/comments.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { getComments } from "../controllers/comments.js";

// Create a new comment
router
  .route("/createComment")
  .post(isAuthenticated, validationMiddleware, createComment);

router.route("/getComments/:id").get(getComments);

export default router;
