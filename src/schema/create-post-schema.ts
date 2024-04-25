import { z } from "zod";

const maxFileSize = Math.pow(2, 22);

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const dataReqListing = z.object({
  title: z.string(),
  description: z.string(),
  price: z
    .union([
      z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
      z.number(),
    ])
    .pipe(z.coerce.number().min(0.01).max(999999999)),
  author: z.string(),
  picture: z.string(),
});

export const createPostFormSchema = z.object({
  title: z.string().min(6).max(50),
  description: z.string().max(500),
  price: z
    .union([
      z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
      z.number(),
    ])
    .pipe(z.coerce.number().min(0.01).max(999999999)),
  image: z
    .any()
    .refine((files) => {
      const img = files?.[0];
      return img?.size <= maxFileSize;
    }, "Max image size is 4MB")
    .refine(
      (files) => {
        const img = files?.[0];
        ACCEPTED_IMAGE_MIME_TYPES.includes(img?.type);
      },
      `Only ${ACCEPTED_IMAGE_MIME_TYPES.join(" ")}are supported`,
    ),
});
