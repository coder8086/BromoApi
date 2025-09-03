const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // your Sequelize instance

const Profile = sequelize.define("Profile", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobno: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: "profile",
  timestamps: false, // change to true if you want createdAt/updatedAt
});

module.exports = Profile;
