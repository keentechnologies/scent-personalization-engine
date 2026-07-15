"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
      window.gtag("config", "AW-17772674522", {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
