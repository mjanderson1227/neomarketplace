import { dataReqListing } from "@/schema/handler-schema";

export async function POST(req: Request) {
  const result = dataReqListing.safeParse(await req.json());
  if (!result.success) {
    return Response.error();
  }
}
