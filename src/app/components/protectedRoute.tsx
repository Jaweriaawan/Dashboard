"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const isLogedIn = localStorage.getItem("isLogedIn");
    if (!isLogedIn) {
      router.push("/admin");
    }
  }, [router]);

  return <>{children}</>;
}
