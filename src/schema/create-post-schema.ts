import { z } from "zod";

export const createPostFormSchema = z.object({
  title: z.string().min(6).max(50),
  description: z.string().max(500).optional(),
  price: z
    .union([
      z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
      z.number(),
    ])
    .pipe(z.coerce.number().min(0.01).max(999999999))
    .pipe(z.coerce.string()),
});
