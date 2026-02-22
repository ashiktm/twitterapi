import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const createTweetSchema = z.object({
    content: z.string().min(1).max(280).openapi({
        description: "The main text of the tweet, can include #hashtags",
        example: "Learning TypeScript and OpenApi today! #coding #typescript"
    }),
}).openapi("CreateTweet");

export type CreateTweetBody = z.infer<typeof createTweetSchema>;
