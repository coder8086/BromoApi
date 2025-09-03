const { auth } = require("../middleware/auth");
const { User, Post, Like, Comment } = require("../models");
const { literal } = require("sequelize");
const { Sequelize } = require("sequelize");
const { fn, col } = require("sequelize");

const createPost = (async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: req.file ? "/uploads/" + req.file.filename : null,
      userId: req.user.id
    });

    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts (Admin sees all, User sees only theirs)
const getAllPost = (auth, async (req, res) => {
  let where = {};
  if (req.user.role === "USER") {
    where = { userId: req.user.id };
  }
  const posts = await Post.findAll({ where, include: "User" });
  res.json(posts);
});

// 🔥 Get ALL posts for ALL users (no restriction)
const getPublicPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      where: { id },
      attributes: [
        "id",
        "title",
        "content",
        "image",

        [fn("COUNT", col("Likes.id")), "likeCount"],

        [
          literal(`CASE WHEN SUM(CASE WHEN Likes.userId = ${req.user.id} THEN 1 ELSE 0 END) > 0 THEN TRUE ELSE FALSE END`),
          "likedByUser",
        ],

        [fn("COUNT", col("Comments.id")), "commentCount"],

        [
          literal(`CASE WHEN SUM(CASE WHEN Comments.userId = ${req.user.id} THEN 1 ELSE 0 END) > 0 THEN TRUE ELSE FALSE END`),
          "commentByUser",
        ],
      ],
      include: [
        { model: Like, attributes: [] },
        { model: Comment, attributes: [] },
        { model: User, attributes: ["id", "name"] },
      ],
      group: ["Post.id"],
    });

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};


const getPostsWithLikes = async (req, res) => {
  try {
    const userId = req.user.id; // 👈 assuming middleware adds user

    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",
        "content",
        "image",

        // Count Likes with subquery
          [
            literal(`(
              SELECT COUNT(*)
              FROM Likes AS l
              WHERE l.postId = Post.id
            )`),
            "likeCount"
          ],

        // boolean instead of sum
        [
          literal(`CASE WHEN SUM(CASE WHEN Likes.userId = ${userId} THEN 1 ELSE 0 END) > 0 THEN TRUE ELSE FALSE END`),
          "likedByUser",
        ],

         // Count Comments with subquery
          [
            literal(`(
              SELECT COUNT(*)
              FROM Comments AS c
              WHERE c.postId = Post.id
            )`),
            "commentCount"
          ],

        [
          literal(`CASE WHEN SUM(CASE WHEN Comments.userId = ${userId} THEN 1 ELSE 0 END) > 0 THEN TRUE ELSE FALSE END`),
          "commentByUser",
        ],
      ],

      include: [
        {
          model: Like,
          attributes: [],
        },
        {
          model: Comment,
          attributes: [],
        },{
          model: User,
          attributes: ["name"],
        }
      ],
      group: ["Post.id"],
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
// Delete post (Admin can delete any, User only their own)
const delPost = (auth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (req.user.role !== "ADMIN" && post.userId !== req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await post.destroy();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { createPost, getAllPost, getPublicPosts, getPostsWithLikes, delPost ,getPostById}