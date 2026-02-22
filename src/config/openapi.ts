import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import * as fs from "fs";
import { z } from "zod";

import { userSignupSchema, userLoginSchema, updateProfileSchema } from "../modules/user/user.schema.js";
import { createTweetSchema } from "../modules/tweet/tweet.schema.js";
import { createCommentSchema } from "../modules/comment/comment.schema.js";
import { toggleLikeSchema } from "../modules/like/like.schema.js";
import { searchHashtagSchema } from "../modules/hashtag/hashtag.schema.js";

const registry = new OpenAPIRegistry();

// --- COMPONENTS ---
// Security Scheme
const bearerAuth = registry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
});

// Register Body Schemas globally
registry.register("UserSignup", userSignupSchema);
registry.register("UserLogin", userLoginSchema);
registry.register("UpdateProfile", updateProfileSchema);
registry.register("CreateTweet", createTweetSchema);
registry.register("CreateComment", createCommentSchema);
registry.register("ToggleLike", toggleLikeSchema);
registry.register("SearchHashtag", searchHashtagSchema);

// --- ROUTES ---

// Auth
registry.registerPath({
    method: "post",
    path: "/api/signup",
    description: "Create a new user account",
    summary: "Sign Up",
    tags: ["User"],
    request: {
        body: {
            content: { "application/json": { schema: userSignupSchema } },
        },
    },
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" } },
});

registry.registerPath({
    method: "post",
    path: "/api/login",
    description: "Login to get a JWT token",
    summary: "Login",
    tags: ["User"],
    request: {
        body: {
            content: { "application/json": { schema: userLoginSchema } },
        },
    },
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" } },
});

// Profile
registry.registerPath({
    method: "put",
    path: "/api/profile",
    description: "Update the authenticated user's profile",
    summary: "Update Profile",
    tags: ["User"],
    security: [{ [bearerAuth.name]: [] }],
    request: {
        body: {
            content: {
                "multipart/form-data": {
                    schema: z.object({
                        bio: z.string().optional(),
                        profilePicture: z.string().optional().openapi({ type: "string", format: "binary" }),
                    })
                }
            },
        },
    },
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" }, 401: { description: "Unauthorized" } },
});

registry.registerPath({
    method: "get",
    path: "/api/profile/{id}",
    description: "Get a user profile by ID",
    summary: "Get Profile",
    tags: ["User"],
    parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" } },
});

// Tweets
registry.registerPath({
    method: "get",
    path: "/api/tweets",
    description: "Get all tweets in the system",
    summary: "Get All Tweets",
    tags: ["Tweet"],
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" } },
});

registry.registerPath({
    method: "post",
    path: "/api/tweet",
    description: "Create a new tweet",
    summary: "Create Tweet",
    tags: ["Tweet"],
    security: [{ [bearerAuth.name]: [] }],
    request: {
        body: {
            content: { "application/json": { schema: createTweetSchema } },
        },
    },
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" }, 401: { description: "Unauthorized" } },
});

registry.registerPath({
    method: "get",
    path: "/api/tweet/{id}",
    description: "Get a specific tweet by ID",
    summary: "Get Tweet",
    tags: ["Tweet"],
    parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" } },
});

registry.registerPath({
    method: "get",
    path: "/api/tweets/search/{tag}",
    description: "Search tweets by hashtag (e.g., 'coding' or '#coding')",
    summary: "Search by Hashtag",
    tags: ["Tweet"],
    parameters: [{ name: "tag", in: "path", required: true, schema: { type: "string" } }],
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" } },
});

// Comments
registry.registerPath({
    method: "post",
    path: "/api/comment",
    description: "Create a comment on a Tweet or another Comment",
    summary: "Create Comment",
    tags: ["Comment"],
    security: [{ [bearerAuth.name]: [] }],
    request: {
        body: {
            content: { "application/json": { schema: createCommentSchema } },
        },
    },
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" }, 401: { description: "Unauthorized" } },
});

// Likes
registry.registerPath({
    method: "post",
    path: "/api/likes/toggle",
    description: "Toggle a like on/off for a Tweet or Comment",
    summary: "Toggle Like",
    tags: ["Like"],
    security: [{ [bearerAuth.name]: [] }],
    request: {
        body: {
            content: { "application/json": { schema: toggleLikeSchema } },
        },
    },
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" }, 401: { description: "Unauthorized" } },
});

// Hashtags
registry.registerPath({
    method: "get",
    path: "/api/hashtags",
    description: "Get all hashtags in the system",
    summary: "Get All Hashtags",
    tags: ["Hashtag"],
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" } },
});

registry.registerPath({
    method: "get",
    path: "/api/hashtags/search/{name}",
    description: "Search hashtags by name",
    summary: "Search Hashtag",
    tags: ["Hashtag"],
    parameters: [{ name: "name", in: "path", required: true, schema: { type: "string" } }],
    responses: { 200: { description: "Success" }, 500: { description: "Server Error" } },
});


// Generate the Document
function generateOpenAPI() {
    const generator = new OpenApiGeneratorV3(registry.definitions);

    const document = generator.generateDocument({
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Twitter Clone API",
            description: "A radically typed API powered by Zod and TypeScript.",
        },
        servers: [
            { url: "https://twitterapi-6tp6.onrender.com", description: "Production Server" },
            { url: "http://localhost:3000", description: "Local Development Server" }
        ],
    });

    fs.writeFileSync("./swagger-output.json", JSON.stringify(document, null, 2), { encoding: "utf-8" });
    console.log("Successfully generated swagger-output.json via Zod Schemas!");
}

generateOpenAPI();
