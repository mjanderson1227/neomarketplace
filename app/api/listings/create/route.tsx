import { dataReqListing } from "@/schema/handler-schema";
import { ItemListing } from "@/schema/drizzle/schema";
import { db } from "@/server/drizzle";

export async function POST(req: Request) {
  const result = dataReqListing.safeParse(await req.json());
  if (!result.success) {
    return Response.error();
  }

  const listingData = result.data;
  db.insert(ItemListing).values(listingData);

  return Response.json({
    message: "Post Successfully Created.",
  });
}
