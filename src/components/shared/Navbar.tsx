"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          DigtalH
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/products" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/products' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Products
          </Link>
          {session?.user && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                Welcome, {session.user.name}!
              </span>
              <Button 
                onClick={() => signOut()}
                variant="outline"
                size="sm"
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}