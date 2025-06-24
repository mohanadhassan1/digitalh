"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

export function WithRole({
  role,
  children,
  fallback,
}: {
  role: "admin" | "user";
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { data: session } = useSession();

  if (session?.user.role === role) {
    return <>{children}</>;
  }

  return <>{fallback || null}</>;
}