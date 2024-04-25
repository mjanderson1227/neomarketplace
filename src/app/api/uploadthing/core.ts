import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/database/drizzle";

const f = createUploadthing();

export const appFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 7 } })
    .middleware(async () => {
      const user = auth();

      if (!user) throw new UploadThingError("Unauthorized");

      const userId = user.userId;
      if (!userId)
        throw new Error(
          "A fatal error has occurred.  Database corruption was detected",
        );

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
