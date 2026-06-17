"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ComingSoonTrigger } from "@/components/coming-soon/coming-soon-provider";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Fragrance Profile", href: "/fragrance-profile" },
  { label: "FAQ", href: "/faq" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-[70] flex h-screen w-[85%] max-w-[380px] flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian">
              <span className="font-serif text-sm font-semibold text-sand">
                C
              </span>
            </span>

            <span className="text-lg font-semibold text-obsidian">
              Crafted Sprays
            </span>
          </div>

          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-1 flex-col px-6 py-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-lg font-medium text-obsidian transition-colors hover:text-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-10">
            <ComingSoonTrigger
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-full bg-obsidian px-6 py-4 text-base font-medium text-cream transition-colors hover:bg-charcoal"
            >
              Start My Discovery →
            </ComingSoonTrigger>
          </div>
        </div>
      </div>
    </>
  );
}
