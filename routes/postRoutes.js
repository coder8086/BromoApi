const express = require("express")
const { auth } = require("../middleware/auth")
const { getAllPost, createPost, getPublicPosts ,getPostsWithLikes,getPostById} = require("../controllers/postController")
const upload = require("../middleware/upload")
const {toggleLike} = require("../controllers/likeController")

const router = express.Router()

router.post("/createPost",auth,upload.single("image"),createPost)
router.get("/allPost",auth, getAllPost)
router.post("/:postId", auth, toggleLike);
router.get("/publicPost", auth,getPublicPosts);
router.get("/fetchposts",auth,getPostsWithLikes);
router.get("/getPostById/:id",auth,getPostById);

module.exports = router