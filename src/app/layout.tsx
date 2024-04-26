import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/src/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/src/components/ui/toaster";
import dynamic from "next/dynamic";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

const DynHeader = dynamic(() => import("./_components/header"), { ssr: false });

export const metadata: Metadata = {
  title: "UTSA Marketplace",
  description: "On Campus Selling Made Easy",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-utsablue">
        <head>
          <title>{metadata.title as string}</title>
        </head>
        <body className={roboto.className}>
          <DynHeader title="UTSA Marketplace"></DynHeader>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
