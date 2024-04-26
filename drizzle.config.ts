import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgres://default:9Q2shMYeBIyj@ep-jolly-recipe-a4m8tc7w-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require",
  },
  verbose: true,
  strict: true,
});
