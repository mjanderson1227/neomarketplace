"use client";
import { usePathname } from "next/navigation";
export function Pathname() {
  const pathname = usePathname();

  return <div>{pathname}</div>;
}
