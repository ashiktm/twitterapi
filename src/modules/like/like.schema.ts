import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const toggleLikeSchema = z.object({
    onModel: z.enum(["Tweet", "Comment"]).openapi({ description: "What is being liked/unliked" }),
    likable: z.string().regex(/^[0-9a-fA-F]{24}$/, "Must be a valid MongoDB ObjectId").openapi({
        description: "The ID of the Tweet or Comment being liked",
        example: "5f8a0d9b8b9b8b0017b3e0a1"
    }),
}).openapi("ToggleLike");

export type ToggleLikeBody = z.infer<typeof toggleLikeSchema>;
