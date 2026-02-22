import express from "express";
import { getAllHashtags, searchHashtag } from "./hashtag.controller.js";
import { validateRequest } from "../../common/validate.middleware.js";
import { searchHashtagSchema } from "./hashtag.schema.js";

const router = express.Router();

router.get("/hashtags", getAllHashtags);
router.get("/hashtags/search/:name", validateRequest(searchHashtagSchema, 'params'), searchHashtag);

export default router;
