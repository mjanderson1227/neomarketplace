"use server";

import { ItemListing } from "@/schema/drizzle/schema";
import { db } from "@/server/drizzle";
import { clerkClient, auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createPostFormSchema } from "@/schema/handler-schema";
import { utapi } from "@/app/_utils/uploadthing";
import { promises as fs } from "node:fs";

export async function createPost(data: string) {
  const parsed = JSON.parse(data) as z.infer<typeof createPostFormSchema>;
  const postData = parsed;

  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const userData = await clerkClient.users.getUser(user.userId);

  const { price, ...listingData } = postData;

  if (!parsed.picture) throw new Error("No Picture Provided.");
  const fileData = Buffer.from(parsed.picture as string, "base64");
  const file = new File(fileData, ".png");

  const res = await utapi.uploadFiles();

  db.insert(ItemListing).values({
    ...listingData,
    price: price.toString(),
    author: userData.emailAddresses[0].emailAddress,
  });

  return {
    message: "User Created.",
  };
}
