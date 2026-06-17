'use client';

import { useState, useEffect } from 'react';
import { MobileMenu } from './mobile-menu-navbar';
import Link from 'next/link';
import { ComingSoonTrigger } from '@/components/coming-soon/coming-soon-provider';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Fragrance Profile', href: '/fragrance-profile' },
  { label: 'FAQ', href: '/faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-cream transition-[border-color] duration-300 ${
          scrolled ? 'border-border/70' : 'border-border/40'
        }`}
      >
        <nav className="flex h-[72px] items-center justify-between gap-4 px-4 sm:h-[80px] sm:gap-6 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian">
              <span className="font-serif text-sm font-semibold text-sand">C</span>
            </span>
            <span className="text-lg font-semibold tracking-tight text-obsidian sm:text-2xl lg:text-3xl">
              Crafted Sprays
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-text-muted transition-colors hover:text-obsidian"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <ComingSoonTrigger
            className="hidden items-center justify-center rounded-full bg-obsidian px-5 py-2 text-[20px] font-medium text-cream transition-colors hover:bg-charcoal md:inline-flex"
          >
            Start My Discovery →
          </ComingSoonTrigger>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-border/50 md:hidden"
          >
            <span className="h-[2px] w-5 bg-obsidian transition-all" />
            <span className="h-[2px] w-5 bg-obsidian transition-all" />
            <span className="h-[2px] w-5 bg-obsidian transition-all" />
          </button>
        </nav>
      </header>
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
