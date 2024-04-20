import { z } from "zod";

export const dataReqListing = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  available: z.boolean(),
  author: z.string(),
});
