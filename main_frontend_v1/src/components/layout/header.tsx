"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { useComingSoon } from "@/components/coming-soon/coming-soon-provider";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { openComingSoon } = useComingSoon();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-[#151311] pt-[env(safe-area-inset-top)] lg:bg-[#151311]/85 lg:backdrop-blur-md"
      style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
    >
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-40 h-[env(safe-area-inset-top)] bg-[#151311] lg:hidden" />
      <div className="container header-inner flex h-[64px] items-center justify-between lg:h-[78px]">
        {/* Logo */}
        <Link href="#top" className="logo-wrap flex items-center gap-[10px]">
          <Image
            src="/assets/logo.png"
            alt="Crafted Sprays"
            width={75}
            height={75}
            className="h-[5rem] w-auto"
            priority
          />
          <span className="heading-serif text-[20px] tracking-[.03em] lg:text-[1.5rem]">
            Crafted Sprays
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-[36px] text-[14px] text-text-secondary">
          <Link href="#why-us" className="hover:text-gold transition-colors">
            Why Us
          </Link>
          <Link href="#how-it-works" className="hover:text-gold transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="hover:text-gold transition-colors">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-gold transition-colors">
            About Us
          </Link>
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={openComingSoon}
          className="btn-gold start-btn hidden lg:inline-flex py-[12px] px-[22px] text-[14px]"
        >
          Start My Discovery
          <ArrowRight className="icon w-[19px] h-[19px]" />
        </button>

        {/* Mobile Hamburger Button */}
        <button
          className="hamburger flex h-[42px] w-[42px] items-center justify-center rounded-[8px] border border-border lg:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="w-[19px] h-[19px] text-text-primary" />
          ) : (
            <Menu className="w-[19px] h-[19px] text-text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } absolute top-full left-0 right-0 border-b border-border bg-[#151311] flex-col px-[24px] pt-[10px] pb-[18px] gap-[4px] lg:hidden`}
      >
        <Link
          href="#why-us"
          className="py-[12px] px-[4px] text-[15px] text-text-secondary border-b border-border hover:text-gold"
          onClick={() => setIsOpen(false)}
        >
          Why Us
        </Link>
        <Link
          href="#how-it-works"
          className="py-[12px] px-[4px] text-[15px] text-text-secondary border-b border-border hover:text-gold"
          onClick={() => setIsOpen(false)}
        >
          How It Works
        </Link>
        <Link
          href="#pricing"
          className="py-[12px] px-[4px] text-[15px] text-text-secondary border-b border-border hover:text-gold"
          onClick={() => setIsOpen(false)}
        >
          Pricing
        </Link>
        <Link
          href="#faq"
          className="py-[12px] px-[4px] text-[15px] text-text-secondary hover:text-gold"
          onClick={() => setIsOpen(false)}
        >
          About Us
        </Link>
      </div>
    </header>
  );
}
