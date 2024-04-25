import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { AppFileRouter } from "@/src/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<AppFileRouter>();
export const UploadDropzone = generateUploadDropzone<AppFileRouter>();
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<AppFileRouter>();
