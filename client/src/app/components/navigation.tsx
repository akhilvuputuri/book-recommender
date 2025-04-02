"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center items-center p-4 bg-gray-900">
      <Link
        href="/"
        className={ pathname === "/" ? "font-bold mr-4": "mr-4 text-blue-500" }>
        Home
      </Link>
      <Link href="/top-books" className={ pathname === "/top-books" ? "font-bold mr-4": "mr-4 text-blue-500" }>
        Top 50
      </Link>
      <Link href="/recommend" className={ pathname === "/recommend" ? "font-bold mr-4": "mr-4 text-blue-500" }>
        Recommend
      </Link>
    </nav>
  )
}