"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/src/components/ui/navigation-menu";

function NavSection() {
  const pathname = usePathname();

  if (pathname.includes("/listings")) {
    return (
      <>
        <NavigationMenuLink href="/about">About</NavigationMenuLink>
        <NavigationMenuLink href="/">Home</NavigationMenuLink>
        {pathname.includes("/create") ? (
          <NavigationMenuLink href="/listings/dashboard">
            Dashboard
          </NavigationMenuLink>
        ) : (
          <NavigationMenuLink href="/listings/create">
            Create Listing
          </NavigationMenuLink>
        )}
      </>
    );
  } else if (pathname == "/") {
    return (
      <>
        <NavigationMenuLink href="/about">About</NavigationMenuLink>
        <NavigationMenuLink href="/listings/dashboard">
          Dashboard
        </NavigationMenuLink>
        <NavigationMenuLink href="/listings/create">
          Create Listing
        </NavigationMenuLink>
      </>
    );
  }
}

const headerStyles: Record<string, string> = {
  white:
    "[&>*]:font-roboto flex justify-beginning px-[8vw] py-4 items-center h-2/3 bg-white-50 bg-white transition-colors duration-700 filter drop-shadow-md sticky top-0",
  blue: "[&>*]:font-roboto flex justify-beginning px-[8vw] py-4 items-center h-2/3 bg-white-50 bg-utsablue transition-colors duration-500 filter text-white",
};

export interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [currentTheme, setCurrentTheme] = useState("blue" as "white" | "blue");
  const [windowSize, setWindowSize] = useState<{
    innerWidth: number | null;
    innerHeight: number | null;
  }>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY) {
        setCurrentTheme("white");
      } else {
        setCurrentTheme("blue");
      }
    };

    const checkWindowSize = () => {
      const { innerWidth, innerHeight } = window;
      setWindowSize({ innerWidth, innerHeight });
    };

    window.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <header className={headerStyles[currentTheme]}>
      <h1 className="text-xl md:text-2xl lg:text-3xl">{title}</h1>
      {windowSize.innerWidth && windowSize.innerWidth >= 650 ? (
        <NavigationMenu className="flex mx-auto hover:[&>a]:text-orange-500 lg:gap-16 lg:text-xl md:text-lg text-sm gap-6">
          <NavSection />
        </NavigationMenu>
      ) : null}
      <div className="absolute lg:right-20 right-8">
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <UserButton />
        <SignedIn></SignedIn>
      </div>
    </header>
  );
}
