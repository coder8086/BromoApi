const { Like, Post } = require("../models");

// Toggle like
const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Check if like exists
    const existingLike = await Like.findOne({ where: { postId, userId } });

    if (existingLike) {
      // Unlike
      await existingLike.destroy();
      return res.json({ message: "Post unliked" });
    }

    // Like
    await Like.create({ postId, userId });
    res.json({ message: "Post liked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { toggleLike };
