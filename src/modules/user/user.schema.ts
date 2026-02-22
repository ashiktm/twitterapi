import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const userSignupSchema = z.object({
    email: z.string().email().openapi({ description: "User email address", example: "john@example.com" }),
    password: z.string().min(6).openapi({ description: "Must be at least 6 characters", example: "secure123" }),
    username: z.string().min(3).openapi({ description: "Unique username", example: "johndoe" }),
}).openapi("UserSignup");

export const userLoginSchema = z.object({
    email: z.string().email().openapi({ description: "User email address", example: "john@example.com" }),
    password: z.string().openapi({ description: "Account password", example: "secure123" }),
}).openapi("UserLogin");

export const updateProfileSchema = z.object({
    bio: z.string().optional().openapi({ description: "Short biography", example: "Software Engineer" }),
    profilePicture: z.string().url().optional().openapi({ description: "URL to profile image", example: "https://example.com/pic.jpg" }),
}).openapi("UpdateProfile");

export type UserSignupBody = z.infer<typeof userSignupSchema>;
export type UserLoginBody = z.infer<typeof userLoginSchema>;
export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;
