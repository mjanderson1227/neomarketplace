import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { AppFileRouter } from "@/app/api/uploadthing/core";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

export const UploadButton = generateUploadButton<AppFileRouter>();
export const UploadDropzone = generateUploadDropzone<AppFileRouter>();
