const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Campaign = sequelize.define("Campaign", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // Campaign Details
  campaignName: { type: DataTypes.STRING(100), allowNull: false },
  objective: {
    type: DataTypes.ENUM("traffic", "engagement", "coupon", "video"),
    defaultValue: "traffic",
  },
  ctaLabel: { type: DataTypes.STRING(50) },
  headline: { type: DataTypes.STRING(60) },
  description: { type: DataTypes.STRING(140) },
  media: { type: DataTypes.STRING },
  destination: { type: DataTypes.STRING },

  // Location
  locationType: {
    type: DataTypes.ENUM("pincode", "city", "radius", "mall"),
  },
  location: { type: DataTypes.STRING },
  latitude: { type: DataTypes.FLOAT },   // ✅ Added
  longitude: { type: DataTypes.FLOAT },  // ✅ Added
  radius: { type: DataTypes.INTEGER, defaultValue: 3 },

  // Audience
  minAge: { type: DataTypes.INTEGER, defaultValue: 18 },
  maxAge: { type: DataTypes.INTEGER, defaultValue: 45 },
  gender: {
    type: DataTypes.ENUM("all", "male", "female"),
    defaultValue: "all",
  },
  interests: { type: DataTypes.JSON },

  // Budget & Schedule
  dailyBudget: { type: DataTypes.FLOAT, defaultValue: 500 },
  totalDays: { type: DataTypes.INTEGER, defaultValue: 7 },
  startDate: { type: DataTypes.DATEONLY },
  endDate: { type: DataTypes.DATEONLY },
  bidding: {
    type: DataTypes.ENUM("cpc", "cpm"),
    defaultValue: "cpc",
  },
  maxBid: { type: DataTypes.FLOAT, defaultValue: 6 },
}, {
  timestamps: true,
  tableName: "campaigns",
});

module.exports = Campaign;
