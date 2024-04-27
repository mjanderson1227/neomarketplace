"use server";
import "server-only";
import { ItemListing, Image } from "@/src/database/schema";
import { db } from "@/src/database/drizzle";
import { revalidateTag } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq, ne, InferSelectModel } from "drizzle-orm";

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
        author: userData.id,
      })
      .returning({
        id: ItemListing.id,
      })
      .then((item) => item[0]);

    listingId = row.id;
  } catch (error) {
    throw new Error(
      `An error occurred while creating the post.\n${(error as Error).message}`,
    );
  }

  revalidateTag("listings");
  redirect(`/listings/${listingId}`);
}

export async function getListing(id: string) {
  try {
    const parsedId = parseInt(id);

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
      .where(eq(Image.listingId, parsedId))
      .limit(7);

    revalidateTag("listings");
    return {
      ...row,
      timestamp: row.timestamp.toString(),
      pictures: pics.map((pic) => pic.href),
    };
  } catch (error) {
    throw new Error("Listing Data Not Found.\n" + error);
  }
}

export async function revisePost(
  revision: Partial<Pick<ListingData, "title" | "description" | "price">>,
  postId: number,
) {
  try {
    await db
      .update(ItemListing)
      .set({
        ...revision,
      })
      .where(eq(ItemListing.id, postId));
  } catch (error) {
    throw new Error("Post data revision failed.");
  }

  revalidateTag("listings");
  redirect(`/listings/${postId}`);
}

export async function createImage(href: string, listingId: number) {
  try {
    await db.insert(Image).values({
      href,
      listingId,
    });
  } catch (error) {
    throw new Error("Image url creation failed." + error);
  }

  revalidateTag("pictures");
  redirect(`/listings/${listingId}`);
}

export async function pullPostCollection(authorId: string): Promise<{
  result: InferSelectModel<typeof ItemListing>[];
  pictureHrefList: string[];
}> {
  let pictureHrefList = new Array<string>();

  try {
    const result = await db
      .select({
        id: ItemListing.id,
        title: ItemListing.title,
        author: ItemListing.author,
        identifier: ItemListing.identifier,
        description: ItemListing.description,
        price: ItemListing.price,
        timestamp: ItemListing.timestamp,
      })
      .from(ItemListing)
      .where(ne(ItemListing.author, authorId))
      .limit(30);

    for (const listing of result) {
      const picture = await db
        .select({
          href: Image.href,
        })
        .from(Image)
        .where(eq(Image.listingId, listing.id))
        .limit(1)
        .then((list) => list[0]);

      pictureHrefList.push(picture?.href);
    }

    return {
      result,
      pictureHrefList,
    };
  } catch (error) {
    throw new Error("Unable to retrieve post list.\n" + error);
  }
}
