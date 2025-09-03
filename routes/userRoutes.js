const express = require("express");
const { auth } = require("../middleware/auth");
const { getAllUsers, getUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/loginUser",auth,getUserById)
router.get("/testRoute",(req,res)=>{
    res.send("tested")
})

module.exports = router;