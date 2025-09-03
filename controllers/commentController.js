const Comment = require("../models/comment");
const User = require("../models/user");

//  Create comment
const createComment = async (req, res) => {
  try {
    const { postId, commentText } = req.body;
    const userId = req.user.id; // from auth middleware

    const comment = await Comment.create({ commentText, postId, userId });

    res.status(201).json(comment);
  } catch (error) {
   
    res.status(500).json({ message: "Sever says:Error creating comment", error });
  }
};

// Get all comments for a post
const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      include: [
        { model: User, attributes: ["name"] }
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

// Delete comment (only owner or admin)
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.destroy();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

module.exports = { createComment, getCommentsByPost, deleteComment };
