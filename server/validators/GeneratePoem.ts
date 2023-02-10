import { z } from "zod";

export const GeneratePoemSchema = z
  .object({
    image: z.string().startsWith("data:image/"),
  })
  .required();
