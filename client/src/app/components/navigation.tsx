"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center items-center p-4 bg-zinc-900 border-b border-zinc-700">
      <Link
        href="/"
        className={pathname === "/" ? "font-bold text-zinc-100 mr-4": "mr-4 text-zinc-500"}>
        Home
      </Link>
      <Link 
        href="/top-books" 
        className={pathname === "/top-books" ? "font-bold text-zinc-100 mr-4": "mr-4 text-zinc-500"}>
        Top 50
      </Link>
      <Link 
        href="/recommend" 
        className={pathname === "/recommend" ? "font-bold text-zinc-100 mr-4": "mr-4 text-zinc-500"}>
        Recommend
      </Link>
    </nav>
  )
}