import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const createCommentSchema = z.object({
    content: z.string().min(1).openapi({ description: "The content of the comment", example: "Great tweet!" }),
    onModel: z.enum(["Tweet", "Comment"]).openapi({ description: "What this comment is attached to" }),
    commentable: z.string().regex(/^[0-9a-fA-F]{24}$/, "Must be a valid MongoDB ObjectId").openapi({
        description: "The ID of the Tweet or Comment being replied to",
        example: "5f8a0d9b8b9b8b0017b3e0a1"
    }),
}).openapi("CreateComment");

export type CreateCommentBody = z.infer<typeof createCommentSchema>;
