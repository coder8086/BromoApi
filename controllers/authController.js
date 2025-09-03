const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Post, Like } = require("../models");



const register = async (req, res) => {
 try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      role: role || "USER" // only admin should set role, but for testing we allow
    });
    res.json({message:"User created"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      "mysecret",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in HTTPS
      sameSite: "lax",   // "none" if frontend/backend are on diff domains
    path: "/",
      maxAge: 3600000
    });

    res.json({ message: "Login successful", role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = (req, res) => {
res.clearCookie("token");
  res.json({ message: "Logged out" });
};

module.exports = { register, login, logout };
