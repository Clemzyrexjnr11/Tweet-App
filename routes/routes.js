import  express from "express";
const router = express.Router();

import {registerUser,loginUsers} from "../controllers/usersControllers/users.js";
import {registerAdmin} from "../controllers/adminController/admin.js";
import {createPost, viewPosts, editPost, deletePost} from "../controllers/postsControllers/post.js";
import authenticateToken from "../controllers/authController/auth.js"
router.post("/registerUser",registerUser);
router.post("/registerAdmin",registerAdmin);
router.post("/login", loginUsers);
router.post("/createPost",authenticateToken, createPost);
router.get("/viewPosts",authenticateToken,viewPosts);
router.put("/editPost/:id", authenticateToken,editPost);
router.delete("/deletePost/:id", authenticateToken,deletePost);


export default router;