const express = require("express")
const {createProfileController} = require("../controllers/profileController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/createProfile",auth,createProfileController)

module.exports = router