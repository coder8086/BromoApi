const { Profile } = require("../models");

const createProfileController = async (req, res) => {
  try {
    const { fullName, gender, mobno, location, dob } = req.body;
    const userId = req.user.id; // from JWT middleware

    const profile = await Profile.create({
      fullName,
      gender,
      mobno,
      location,
      dob,
      user_id: userId,
    });

    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createProfileController };
