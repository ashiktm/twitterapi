import express from "express";
import { createTweet, getTweet, getTweetAll, searchTweetByTag } from "./tweet.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { validateRequest } from "../../common/validate.middleware.js";
import { createTweetSchema } from "./tweet.schema.js";

const router = express.Router();

router.post("/tweet", authenticate, validateRequest(createTweetSchema), createTweet);
router.get("/tweet/:id", getTweet);
router.get("/tweets", getTweetAll);
router.get("/tweets/search/:tag", searchTweetByTag);

export default router;
