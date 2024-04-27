"use server";
import {
  CardContent,
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardDescription,
} from "@/src/components/ui/card";
import { pullPostCollection } from "@/src/server/queries";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const session = auth();

  if (!session?.userId) return <h1>Not Authenticated</h1>;

  const postData = await pullPostCollection(session.userId);

  return (
    <>
      {postData.result.map(
        ({ identifier, timestamp, price, description, title, id }, idx) => {
          return (
            <Card key={id} className="bg-utsablue flex flex-col">
              <CardHeader>
                <CardTitle className="text-white">
                  <Link href={`/listings/${id}`}>{title}</Link>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent className="self-center">
                <Image
                  src={postData.pictureHrefList[idx]}
                  width={250}
                  height={50}
                  alt="A cool image of a product listing."
                ></Image>
              </CardContent>
              <CardFooter className="text-gray-400 text-sm">
                {timestamp.toString().split(" ").slice(0, 4).join(" ")}
              </CardFooter>
            </Card>
          );
        },
      )}
    </>
  );
}
