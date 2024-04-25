import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/src/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/src/components/ui/toaster";
import Header from "./_components/header";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UTSA Marketplace",
  description: "On Campus Selling Made Easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  params: {
    route: string;
  };
  children: React.ReactNode;
  landing: React.ReactNode;
  posts: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-utsablue">
        <head>
          <title>{metadata.title as string}</title>
        </head>
        <body className={roboto.className}>
          <Header title="Rowdy Marketplace"></Header>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
