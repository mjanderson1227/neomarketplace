import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./header";
import { Toaster } from "@/components/ui/toaster";

const inter = Roboto({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UTSA Marketplace",
  description: "On Campus Selling Made Easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-utsablue">
        <body className={inter.className}>
          <Header></Header>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
