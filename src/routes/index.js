import express from "express";
import { createComment } from "../controller/commentController.js";
import { toggleLike } from "../controller/toggleLike-controller.js";
import { createTweet, getTweet, getTweetAll, searchTweetByTag } from "../controller/tweet-controller.js";
import { createUser, loginUser, updateProfile, getProfile } from "../controller/user-controller.js";
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
