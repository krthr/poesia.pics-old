import { z } from "zod";

const ColorSchema = z.object({
  color: z.string(),
  fraction: z.string(),
});

export const StorePoemSchema = z
  .object({
    author: z.string(),
    colors: z.array(ColorSchema).min(1),
    image: z.string(),
    generatedAt: z.date(),
    generatedAtLabel: z.string(),
    keywords: z.array(z.string()).min(1),
    poem: z.string(),
    signature: z.string(),
  })
  .required();
