require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes")
const postRoutes = require("./routes/postRoutes")
const commentRoutes = require("./routes/commentRoutes")


const sequelize = require("./config/db");

const path = require("path");

// Import models to sync relations
require("./models/user");
require("./models/Post");

const app = express();

app.use(cors({
  origin:"http://localhost:5173", // frontend origin
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);


app.get('/test',(req,res)=>{
  res.send("working ....")
})

// serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced");
  app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
});



