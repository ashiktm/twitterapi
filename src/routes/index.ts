import express from "express";
import { createComment } from "../modules/comment/comment.controller.js";
import { toggleLike } from "../modules/like/like.controller.js";
import { createTweet, getTweet, getTweetAll, searchTweetByTag } from "../modules/tweet/tweet.controller.js";
import { createUser, loginUser, updateProfile, getProfile } from "../modules/user/user.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/tweet", authenticate, createTweet);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/likes/toggle", authenticate, toggleLike);
router.post("/comment", authenticate, createComment);
router.get("/tweet/:id", getTweet);
router.get("/tweets", getTweetAll);
router.get("/tweets/search/:tag", searchTweetByTag);
router.put("/profile", authenticate, updateProfile);
router.get("/profile/:id", getProfile);

export default router;
