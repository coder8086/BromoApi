const { User, Post, Like } = require("../models");
const { authorize } = require("../middleware/auth");

//  Get all users (only ADMIN)
const getAllUsers = [
  authorize("ADMIN"),
  async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }
];

// Get user by ID
const getUserById = async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findByPk(userId,{
        attributes:[
          "name",
          "email",
          "role"
        ]
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  };

module.exports = { getAllUsers, getUserById };
