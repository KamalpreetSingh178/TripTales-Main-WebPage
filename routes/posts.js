import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/", verifyToken, getFeedPosts);//Get User Feed when we are on Homepage
//All the feeds will be sent to Homepage
router.get("/:userId/posts", verifyToken, getUserPosts);//To Posts posted by User on his profile

/* Update */
router.patch("/:id/like", verifyToken, likePost);//For liking and Unliking the post

export default router;
