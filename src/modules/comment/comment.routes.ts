import express from "express";
import { createComment } from "./comment.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { validateRequest } from "../../common/validate.middleware.js";
import { createCommentSchema } from "./comment.schema.js";

const router = express.Router();

router.post("/comment", authenticate, validateRequest(createCommentSchema), createComment);

export default router;
