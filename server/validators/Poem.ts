import { z } from "zod";
import { GeneratedPoem } from "../api/poems/generate.post";

const ColorSchema = z.object({
  color: z.object({
    red: z.number(),
    green: z.number(),
    blue: z.number(),
  }),
  pixelFraction: z.number(),
});

export const PoemSchema = z.object({
  signature: z.string(),
  author: z.array(z.string()).min(1),
  colors: z.array(ColorSchema).min(1),
  image: z.string(),
  generatedAt: z.string().datetime(),
  generatedAtLabel: z.string(),
  keywords: z.array(z.string()).min(1),
  mode: z.string().optional(),
  poem: z.string(),
});
