const jwt = require("jsonwebtoken");

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" });

const sendTokenAsCookie = (res, user) => {
  const token = signToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true", // HTTPS in prod
    sameSite: "lax",
    maxAge: 60 * 60 * 1000
  });
  return token;
};

module.exports = { signToken, sendTokenAsCookie };
