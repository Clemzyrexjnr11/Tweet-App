const express = require("express");
const router = express.Router();

const {registerUser,loginUsers} = require("../controllers/usersControllers/users.js");
const {registerAdmin} = require("../controllers/adminController/admin.js");
const {createPost,viewPosts,editPost, deletePost} = require("../controllers/postsControllers/post.js");
const {authenticateToken} = require("../controllers/authController/auth.js")
router.post("/registerUser",registerUser);
router.post("/registerAdmin",registerAdmin);
router.post("/login", loginUsers);
router.post("/createPost",authenticateToken, createPost);
router.get("/viewPosts",authenticateToken,viewPosts);
router.put("/editPost/:id", authenticateToken,editPost);
router.delete("/deletePost/:id", authenticateToken,deletePost);


module.exports = router;