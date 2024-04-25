"use server";

import { ItemListing, Image } from "@/src/database/schema";
import { db } from "@/src/database/drizzle";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(
  title: string,
  author: string,
  price: string,
  description?: string | undefined,
) {
  try {
    const { id } = (
      await db
        .insert(ItemListing)
        .values({
          title,
          author,
          price,
          description,
        })
        .returning({
          id: ItemListing.id,
        })
    )[0];

    revalidateTag("listings");
    redirect(`/listing/${id}`);
  } catch (error) {
    throw new Error(
      `An error occurred while creating the post.\n${(error as Error).message}`,
    );
  }
}
