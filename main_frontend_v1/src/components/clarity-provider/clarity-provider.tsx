"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export function ClarityProvider() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "xchuzp1it6";

    if (!projectId) {
      console.warn("Microsoft Clarity Project ID is missing.");
      return;
    }

    Clarity.init(projectId);
  }, []);

  return null;
}