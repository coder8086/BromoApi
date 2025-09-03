// routes/commentRoutes.js
const express = require("express");
const { createComment, getCommentsByPost, deleteComment } = require("../controllers/commentController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/createComment", auth, createComment);         // POST /comments
router.get("/getCommentByPostId/:postId",auth, getCommentsByPost);            // GET /comments/:postId
router.delete("/deleteComment/:id", auth, deleteComment);    // DELETE /comments/:id

module.exports = router;
