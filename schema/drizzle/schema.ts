import {
  serial,
  text,
  timestamp,
  pgTable,
  decimal,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("account_type", [
  "administrator",
  "default",
]);

export const UserInformation = pgTable("user_information", {
  id: serial("user_id").primaryKey(),
  firstName: text("user_fname"),
  lastName: text("user_lname"),
  phoneNumber: text("user_phone"),
  email: text("user_email").notNull(),
  password: text("user_password").notNull(),
  salt: text("user_password_salt").notNull(),
  type: userTypeEnum("user_type").default("default"),
});

export const ItemListing = pgTable("item_listing", {
  id: serial("listing_id").primaryKey(),
  title: text("listing_title").notNull(),
  author: serial("user_id").references(() => UserInformation.id),
  description: text("listing_description").default("No Description"),
  price: decimal("listing_price"),
  available: boolean("listing_availability").notNull().default(true),
  timestamp: timestamp("listing_timestamp").notNull().defaultNow(),
});
