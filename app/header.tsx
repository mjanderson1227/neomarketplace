"use client";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import LoginForm from "@/components/auth/login-form";
import { useEffect, useState } from "react";

const headerStyles: Record<string, string> = {
  white:
    "[&>*]:font-roboto flex justify-between px-[8vw] py-4 items-center h-2/3 bg-white-50 bg-white transition-colors duration-700 filter drop-shadow-md sticky top-0",
  blue: "[&>*]:font-roboto flex justify-between px-[8vw] py-4 items-center h-2/3 bg-white-50 bg-utsablue transition-colors duration-500 filter text-white",
};

export default function Header() {
  const [currentTheme, setCurrentTheme] = useState("blue" as "white" | "blue");

  useEffect(() => {
    const callback = () => {
      if (window.scrollY) {
        setCurrentTheme("white");
      } else if (currentTheme != "blue") {
        setCurrentTheme("blue");
      }
    };

    window.addEventListener("scroll", callback);

    return () => window.removeEventListener("scroll", callback);
  }, [currentTheme]);

  return (
    <header className={headerStyles[currentTheme]}>
      <h1 className="text-xl md:text-2xl lg:text-3xl">Rowdy Marketplace</h1>
      <NavigationMenu className="text-xl flex items-center justify-center gap-16 flex-1 [&>a:hover]:text-orange-500">
        <NavigationMenuLink className="cursor-pointer">Home</NavigationMenuLink>
        <NavigationMenuLink className="cursor-pointer">
          Catalog
        </NavigationMenuLink>
        <NavigationMenuLink className="cursor-pointer">
          Posts
        </NavigationMenuLink>
      </NavigationMenu>
      <div className="flex gap-8">
        <LoginForm />
      </div>
    </header>
  );
}