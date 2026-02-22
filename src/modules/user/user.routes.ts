import express from "express";
import { createUser, loginUser, updateProfile, getProfile } from "./user.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { validateRequest } from "../../common/validate.middleware.js";
import { userSignupSchema, userLoginSchema, updateProfileSchema } from "./user.schema.js";

const router = express.Router();

router.post("/signup", validateRequest(userSignupSchema), createUser);
router.post("/login", validateRequest(userLoginSchema), loginUser);
router.put("/profile", authenticate, validateRequest(updateProfileSchema), updateProfile);
router.get("/profile/:id", getProfile);

export default router;
