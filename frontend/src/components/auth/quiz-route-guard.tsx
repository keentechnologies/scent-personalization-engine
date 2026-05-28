"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

type QuizRouteGuardProps = {
  children: React.ReactNode;
};

export default function QuizRouteGuard({
  children,
}: QuizRouteGuardProps) {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("jwt_token");

    const sessionId =
      localStorage.getItem("session_id");

    if (!token || !sessionId) {
      router.replace("/login");

      return;
    }
  }, [router]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("jwt_token")
      : null;

  const sessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("session_id")
      : null;

  if (!token || !sessionId) {
    return null;
  }

  return <>{children}</>;
}