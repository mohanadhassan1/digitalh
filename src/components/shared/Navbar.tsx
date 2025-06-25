"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold">
          DigtalH
        </Link>
        <div className="flex items-center gap-4">
          <Button
            variant={pathname.includes("/products") ? "secondary" : "ghost"}
            asChild
          >
            <Link href="/products">Products</Link>
          </Button>
          <Button variant="ghost" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
}