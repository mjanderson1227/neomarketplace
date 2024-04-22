import {
  serial,
  text,
  timestamp,
  pgTable,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("account_type", [
  "administrator",
  "default",
]);

export const ItemListing = pgTable("item_listing", {
  id: serial("listing_id").primaryKey(),
  title: text("listing_title").notNull(),
  author: text("listing_author").notNull(),
  description: text("listing_description").default("No Description"),
  price: decimal("listing_price").notNull(),
  timestamp: timestamp("listing_timestamp").notNull().defaultNow(),
  picture: text("listing_picture").notNull(),
});
