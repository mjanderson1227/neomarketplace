"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getListing } from "@/src/server/queries";
import { Button } from "@/src/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Card, CardContent } from "@/src/components/ui/card";
import PostOptions from "./_components/post-options";
import { useUser } from "@clerk/nextjs";
import { UploadDropzone } from "@/src/utils/uploadthing";
import { createImage } from "@/src/server/queries";

function InformationSection({ listing }: { listing: ListingData | undefined }) {
  const session = useUser();

  const OptionSection = () => {
    if (!session?.user?.id || !listing?.id) {
      return;
    } else if (session.user.id != listing.author) {
      return;
    } else {
      return <PostOptions listing={listing}></PostOptions>;
    }
  };

  const MessageSection = () => {
    if (!session.isSignedIn) {
      return;
    } else if (!session.user) {
      return;
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {listing && (
        <>
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-4xl max-w-lg text-center">{listing.title}</h3>
            <div className="flex gap-12">
              <h2 className="">Author: {listing.identifier}</h2>
              <h2 className="">
                Created: {listing.timestamp.split(" ").splice(0, 4).join(" ")}
              </h2>
            </div>
          </div>
          <h1 className="max-w-sm text-center self-center overflow-hidden">
            {listing.description}
          </h1>
          <h2>Price: ${listing.price}</h2>
        </>
      )}
      <div className="flex">
        <OptionSection></OptionSection>
      </div>
    </div>
  );
}

function PictureSection({ listing }: { listing: ListingData | undefined }) {
  const ListingElements = () =>
    listing?.pictures.map((link, idx) => {
      return (
        <CarouselItem key={idx} className="flex items-center justify-center">
          <Image
            src={link}
            width={2000}
            height={2000}
            alt="A picture of a item the listing creator wants to sell."
          ></Image>
        </CarouselItem>
      );
    });

  return (
    <div className="h-full col-span-2 bg-utsablue flex items-center justify-center">
      <Carousel className="w-full max-w-lg">
        <CarouselContent>
          {listing?.pictures.length ? (
            <ListingElements />
          ) : (
            <CarouselItem>
              <div>
                <Card>
                  <CardContent className="aspect-square flex items-center justify-center">
                    <span className="text-3xl">No pictures are available.</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
}

export default function PostListing({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<ListingData>();

  useEffect(() => {
    getListing(params.id).then((res) => setListing(res));
  }, [params.id]);

  return (
    <>
      <PictureSection listing={listing} />
      {listing && (
        <UploadDropzone
          endpoint="imageUploader"
          className="col-span-1 w-36 h-48 bg-white self-center justify-self-center"
          onClientUploadComplete={(res) =>
            res.forEach((item) => createImage(item.url, listing.id))
          }
        />
      )}
      <div className="flex col-span-2">
        <Card>
          <CardContent>
            <InformationSection listing={listing} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
