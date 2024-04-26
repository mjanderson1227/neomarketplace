"use server";

import { ItemListing, Image } from "@/src/database/schema";
import { db } from "@/src/database/drizzle";
import { revalidateTag } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createPost(
  title: string,
  userid: string,
  price: string,
  description?: string | undefined,
) {
  let listingId: number;

  const userData = await clerkClient.users.getUser(userid);

  if (!userData) throw new Error("Not authorized");

  try {
    const row = await db
      .insert(ItemListing)
      .values({
        title,
        price,
        description,
        identifier:
          userData.fullName || userData.emailAddresses[0].emailAddress,
        author: userData.id.slice(4),
      })
      .returning({
        id: ItemListing.id,
      });

    listingId = row[0].id;
  } catch (error) {
    throw new Error(
      `An error occurred while creating the post.\n${(error as Error).message}`,
    );
  }

  revalidateTag("listings");
  redirect(`/listings/${listingId}`);
}

export async function getListing(
  id: string,
): Promise<ListingRecordReturn & { pictures: string[] }> {
  const parsedId = parseInt(id);
  let dataToReturn: ListingRecordReturn & { pictures: string[] };
  try {
    const row = await db
      .select({
        title: ItemListing.title,
        author: ItemListing.author,
        identifier: ItemListing.identifier,
        price: ItemListing.price,
        description: ItemListing.description || "No description provided",
        timestamp: ItemListing.timestamp,
        id: ItemListing.id,
      })
      .from(ItemListing)
      .where(eq(ItemListing.id, parsedId))
      .limit(1)
      .then((row) => row[0]);

    const pics = await db
      .select({
        href: Image.href,
      })
      .from(Image)
      .where(eq(Image.listing_id, parsedId))
      .limit(7);

    dataToReturn = {
      ...row,
      timestamp: row.timestamp.toString(),
      pictures: pics.map((pic) => pic.href),
    };
  } catch (error) {
    throw new Error(
      "An Error Occurred: unable to get listing data\n" +
        (error as Error).message,
    );
  }

  revalidateTag("listings");
  return dataToReturn;
}
