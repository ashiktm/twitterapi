import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const searchHashtagSchema = z.object({
    name: z.string().min(1).openapi({
        description: "The name of the hashtag to search for",
        example: "coding"
    }),
}).openapi("SearchHashtagParams");

export type SearchHashtagParams = z.infer<typeof searchHashtagSchema>;
