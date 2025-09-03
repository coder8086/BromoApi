const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentText: {
    type: DataTypes.STRING,
    allowNull:false,
  }
}, {
  timestamps: true,
});


module.exports = Comment;
