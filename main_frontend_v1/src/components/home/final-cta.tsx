"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ShieldCheck, Lock, ArrowRight, FlaskConical, Truck } from "lucide-react";
import { useComingSoon } from "@/components/coming-soon/coming-soon-provider";

export function FinalCta() {
  const { openComingSoon } = useComingSoon();
  return (
    <section
      id="final-cta"
      className="relative py-[60px] lg:py-[110px] overflow-hidden bg-bg-alt"
    >
      {/* Background Image & Overlay for Desktop */}
      <div className="absolute inset-0 hidden lg:block z-0">
        <Image
          src="/assets/final-cta-bg.png"
          alt="Crafted Sprays fragrance bottle background"
          fill
          className="object-cover object-right"
        />
        {/* Left-to-right gradient overlay matching the desktop styles */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#151311]/95 via-[#151311]/75 via-[#151311]/20 to-[#151311]/05" />
      </div>

      {/* Desktop Layout */}
      <div className="container relative z-10 hidden lg:grid grid-cols-[1.1fr_0.9fr] gap-[48px] items-center">
        <div>
          <h2 className="heading-serif cta-h2 text-[42px] leading-[1.15] mb-[18px]">
            Ready To Discover What Actually <span className="text-gold">Suits You?</span>
          </h2>
          <p className="text-text-secondary cta-sub text-[15.5px] leading-[1.7] mb-[30px] max-w-[440px]">
            Start your 5-minute discovery and receive a fragrance crafted around you.
          </p>
          <button onClick={openComingSoon} className="btn-gold mb-[36px]">
            Start My Discovery
            <ArrowRight className="icon w-[19px] h-[19px]" />
          </button>

          {/* Desktop Trust Row */}
          <div className="trust-row flex gap-[32px] mb-[36px] flex-wrap mt-[28px]">
            <div className="trust-item flex items-center gap-[10px]">
              <Clock className="w-[18px] h-[18px] text-gold" />
              <div>
                <p className="trust-item-title text-[13px] font-semibold">5 Minutes</p>
                <p className="trust-item-sub text-text-secondary text-[11px]">Quick &amp; Easy</p>
              </div>
            </div>
            <div className="trust-item flex items-center gap-[10px]">
              <ShieldCheck className="w-[18px] h-[18px] text-gold" />
              <div>
                <p className="trust-item-title text-[13px] font-semibold">100% Personal</p>
                <p className="trust-item-sub text-text-secondary text-[11px]">Built Around You</p>
              </div>
            </div>
            <div className="trust-item flex items-center gap-[10px]">
              <Lock className="w-[18px] h-[18px] text-gold" />
              <div>
                <p className="trust-item-title text-[13px] font-semibold">Private &amp; Secure</p>
                <p className="trust-item-sub text-text-secondary text-[11px]">Your Data Is Safe</p>
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="card cta-testi p-[18px] max-w-[420px] bg-[#24201d]/70 border border-border rounded-[16px]">
            <div className="stars text-gold text-[13px] mb-[6px]">★★★★★</div>
            <p className="text-[13.5px] leading-[1.6] mb-[8px] text-text-primary">
              &ldquo;This was the first fragrance recommendation that actually felt like me.&rdquo;
            </p>
            <p className="text-text-secondary text-[12px]">Rishabh S. &middot; Bengaluru</p>
          </div>
        </div>

        {/* Empty right column for background image spacing */}
        <div />
      </div>

      {/* Mobile Layout */}
      <div className="container relative z-10 block lg:hidden">
        <div className="mobile-final-cta-extra">
          <div className="mfcta-head text-center mb-[22px]">
            <p className="heading-serif mfcta-h1 text-[28px] leading-[1.2] m-0 text-text-primary">Your Signature Scent</p>
            <p className="heading-serif mfcta-h1 text-[28px] leading-[1.2] m-0 text-gold">Starts Here</p>
            <span className="mfcta-divider block w-[54px] h-[1px] bg-gold/50 my-[16px] mx-auto relative after:content-[''] after:absolute after:left-[50%] after:top-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[5px] after:h-[5px] after:rounded-full after:bg-gold" />
            <p className="text-text-secondary mfcta-sub text-[13.5px] leading-[1.6] mt-[14px]">
              Take your 5-minute discovery and let us craft your perfect fragrance.
            </p>
          </div>

          {/* Mobile Visual */}
          <div className="mfcta-visual w-full aspect-[4/5] rounded-[16px] overflow-hidden mb-[22px] relative">
            <Image
              src="/assets/mobile-hero-bg.png"
              alt="Crafted Sprays fragrance bottle glowing in box"
              fill
              className="object-cover object-[center_30%]"
            />
          </div>

          {/* Mobile Features Row with vertical dividers */}
          <div className="mfcta-features flex items-center justify-between border border-border rounded-[14px] p-[18px_8px] mb-[20px] bg-card">
            <div className="mfcta-feature flex-1 flex flex-col items-center gap-[8px] text-center">
              <div className="mfcta-feature-icon text-gold">
                <UserIcon className="w-[22px] h-[22px]" />
              </div>
              <p className="text-[11.5px] leading-[1.3] text-text-secondary m-0">Personalised<br />for You</p>
            </div>
            
            <span className="mfcta-divider-v w-[1px] h-[32px] bg-border flex-shrink-0" />
            
            <div className="mfcta-feature flex-1 flex flex-col items-center gap-[8px] text-center">
              <div className="mfcta-feature-icon text-gold">
                <FlaskConical className="w-[22px] h-[22px]" />
              </div>
              <p className="text-[11.5px] leading-[1.3] text-text-secondary m-0">Crafted<br />Fresh</p>
            </div>

            <span className="mfcta-divider-v w-[1px] h-[32px] bg-border flex-shrink-0" />

            <div className="mfcta-feature flex-1 flex flex-col items-center gap-[8px] text-center">
              <div className="mfcta-feature-icon text-gold">
                <Truck className="w-[22px] h-[22px]" />
              </div>
              <p className="text-[11.5px] leading-[1.3] text-text-secondary m-0">Delivered in<br />4 Days</p>
            </div>
          </div>

          {/* Mobile Start button */}
          <button
            onClick={openComingSoon}
            className="mfcta-btn flex items-center justify-center gap-[10px] w-full bg-gold text-[#1a1410] rounded-[10px] p-[16px] font-semibold text-[15px] mb-[16px]"
          >
            Start Your Discovery
            <ArrowRight className="w-[19px] h-[19px]" />
          </button>

          {/* Mobile Trust badge */}
          <div className="mfcta-trust flex items-center justify-center gap-[8px] text-[12px] text-text-secondary">
            <ShieldCheck className="w-[15px] h-[15px] text-gold" />
            <span>Privately Crafted. Confidently Yours.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple fallback User icon to resolve dynamic component dependencies
function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
