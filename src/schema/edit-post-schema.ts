import { z } from "zod";
import { createPostFormSchema } from "./create-post-schema";

export const editPostSchema = createPostFormSchema.partial();
