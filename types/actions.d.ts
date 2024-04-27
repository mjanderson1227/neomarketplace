declare interface ListingRecordReturn {
  title: string;
  author: string;
  price: string;
  description: string | null;
  timestamp: string;
  identifier: string;
  id: number;
}

declare type ListingData = ListingRecordReturn & { pictures: string[] };
