import express from "express";
import { getAllHashtags, searchHashtag } from "./hashtag.controller.js";

const router = express.Router();

router.get("/hashtags", getAllHashtags);
router.get("/hashtags/search/:name", searchHashtag);

export default router;
