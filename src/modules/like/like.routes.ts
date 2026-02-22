import express from "express";
import { toggleLike } from "./like.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { validateRequest } from "../../common/validate.middleware.js";
import { toggleLikeSchema } from "./like.schema.js";

const router = express.Router();

router.post("/likes/toggle", authenticate, validateRequest(toggleLikeSchema), toggleLike);

export default router;
