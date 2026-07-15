"use client";

import {
  createContext,
  type ButtonHTMLAttributes,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { ComingSoonPopup } from "./coming_soon_popup";

interface ComingSoonContextValue {
  openComingSoon: () => void;
}

const ComingSoonContext = createContext<ComingSoonContextValue | null>(null);

export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("preregister") === "true") {
        setIsOpen(true);
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "coming_soon_opened", {
            trigger: "url_param",
            preregister: "true",
          });
        }
      }
    }
  }, []);

  return (
    <ComingSoonContext.Provider
      value={{
        openComingSoon: () => {
          setIsOpen(true);
          if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", "coming_soon_opened", {
              trigger: "button_click",
            });
          }
        },
      }}
    >
      {children}
      <ComingSoonPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const context = useContext(ComingSoonContext);

  if (!context) {
    throw new Error("useComingSoon must be used within ComingSoonProvider");
  }

  return context;
}

interface ComingSoonTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ComingSoonTrigger({
  children,
  onClick,
  type = "button",
  ...props
}: ComingSoonTriggerProps) {
  const { openComingSoon } = useComingSoon();

  return (
    <button
      type={type}
      onClick={(event) => {
        onClick?.(event);
        openComingSoon();
      }}
      {...props}
    >
      {children}
    </button>
  );
}
