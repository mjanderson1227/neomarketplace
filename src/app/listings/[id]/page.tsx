"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getListing } from "@/src/server/actions";
import { Button } from "@/src/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import CardWrapper from "@/src/components/ui-extensions/card-wrapper";

export default function PostListing({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<
    ListingRecordReturn & { pictures: string[] }
  >();

  useEffect(() => {
    getListing(params.id).then((res) => setListing(res));
  }, [params.id]);

  return (
    <div className="h-[80vh] grid grid-cols-2" id={listing && listing.author}>
      <div className="h-full bg-utsablue flex items-center justify-center">
        <Carousel className="">
          <CarouselContent>
            <CardWrapper
              title="Images"
              description="Images that the seller has about this item."
            >
              {listing?.pictures?.length ? (
                listing.pictures.map((url) => (
                  <>
                    <CarouselItem className="basis-1/3">
                      <Image
                        src={url}
                        alt="An image of the item the seller is offering."
                      />
                    </CarouselItem>{" "}
                  </>
                ))
              ) : (
                <CarouselItem>No images have been uploaded yet!</CarouselItem>
              )}
            </CardWrapper>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex flex-col items-center gap-20 p-8">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-4xl">{listing && listing.title}</h3>
          <div className="flex gap-12">
            <h2 className="">Author: {listing && listing.identifier}</h2>
            <h2 className="">
              Created:{" "}
              {listing && listing.timestamp.split(" ").splice(0, 4).join(" ")}
            </h2>
          </div>
        </div>
        <h1 className="max-w-10 text-center self-start">
          {listing && listing.description}
        </h1>
        <Button type="button" className="mt-auto">
          Send a message
        </Button>
      </div>
    </div>
  );
}
