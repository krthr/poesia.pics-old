import { z } from "zod";

export const StorePoemSchema = z
  .object({
    author: z.string(),
    keywords: z.array(z.string()),
    poem: z.string(),
  })
  .required();
