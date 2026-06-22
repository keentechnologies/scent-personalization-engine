"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Fingerprint,
  FlaskConical,
  Sparkles,
  Truck,
  Star,
  Tag,
  Clock,
  ShieldCheck,
  ArrowRight,
  Award,
} from "lucide-react";

import { useComingSoon } from "@/components/coming-soon/coming-soon-provider";

export function Pricing() {
  const { openComingSoon } = useComingSoon();
  return (
    <section id="pricing" className="py-[60px] lg:py-[90px] bg-bg">
      {/* Desktop Layout */}
      <div className="container hidden lg:block">
        <div className="section-head text-center max-w-[640px] mx-auto mb-[56px]">
          <p className="eyebrow justify-center mb-[14px]">Choose Your Bottle :</p>
          <h2 className="heading-serif text-[36px] mb-[14px]">Crafted for You, Bottled Your Way</h2>
          <p className="text-text-secondary text-[16px]">Every fragrance is individually crafted after your discovery. Choose the bottle size that fits you best.</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid grid grid-cols-2 gap-[24px] mb-[32px]">
          {/* 50ml Card */}
          <div className="card pricing-card relative grid grid-cols-[auto_1fr] items-center gap-[16px] p-[28px] overflow-hidden bg-black rounded-[16px]">
            {/* Background radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_50%,rgba(196,130,58,0.16)_0%,rgba(196,130,58,0.04)_45%,transparent_75%)] pointer-events-none z-0" />
            
            {/* Visual Column */}
            <div className="pricing-img-col relative z-10 flex flex-col items-center flex-shrink-0 text-center">
              <div className="pricing-img-wrap relative w-[300px] height-[380px] flex justify-center items-center">
                {/* Glow effect background */}
                <div className="absolute left-[38%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(196,130,58,0.55)_0%,rgba(196,130,58,0.22)_45%,rgba(196,130,58,0)_72%)] z-0" />
                <Image
                  src="/assets/pricing-product-final.png"
                  alt="Crafted Sprays 50ml fragrance bottle"
                  width={220}
                  height={280}
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
                />
              </div>
              <p className="heading-serif text-gold pricing-price text-[24px] mt-[12px] mb-[2px]">₹1,200</p>
              <p className="text-text-secondary pricing-price-note text-[12px]">(All taxes included)</p>
            </div>

            {/* Info Column */}
            <div className="relative z-10 pl-[8px]">
              <h3 className="heading-serif pricing-size text-[38px] mb-[8px]">50ml</h3>
              <p className="text-text-secondary pricing-sub text-[11.5px] tracking-[.08em] uppercase mb-[18px]">
                Perfect To Discover<br />Your Signature Scent
              </p>
              <span className="pricing-accent w-[36px] h-[2px] bg-gold mb-[18px] block" />
              
              <div className="pricing-features flex flex-col gap-[18px] mb-[28px]">
                <div className="pricing-feature flex items-center gap-[12px] text-[13.5px]">
                  <span className="w-[32px] h-[32px] rounded-full border border-border flex items-center justify-center text-gold flex-shrink-0">
                    <Fingerprint className="w-[15px] h-[15px]" />
                  </span>
                  <span className="text-text-secondary">Personalised fragrance profile</span>
                </div>
                <div className="pricing-feature flex items-center gap-[12px] text-[13.5px]">
                  <span className="w-[32px] h-[32px] rounded-full border border-border flex items-center justify-center text-gold flex-shrink-0">
                    <FlaskConical className="w-[15px] h-[15px]" />
                  </span>
                  <span className="text-text-secondary">Crafted specifically for you</span>
                </div>
                <div className="pricing-feature flex items-center gap-[12px] text-[13.5px]">
                  <span className="w-[32px] h-[32px] rounded-full border border-border flex items-center justify-center text-gold flex-shrink-0">
                    <Sparkles className="w-[15px] h-[15px]" />
                  </span>
                  <span className="text-text-secondary">Premium bottle</span>
                </div>
                <div className="pricing-feature flex items-center gap-[12px] text-[13.5px]">
                  <span className="w-[32px] h-[32px] rounded-full border border-border flex items-center justify-center text-gold flex-shrink-0">
                    <Truck className="w-[15px] h-[15px]" />
                  </span>
                  <span className="text-text-secondary">Delivered in 4 days</span>
                </div>
              </div>

              <button onClick={openComingSoon} className="btn-gold pricing-cta w-full justify-center whitespace-normal text-center">
                Start Discovery ₹1,200
                <ArrowRight className="icon w-[19px] h-[19px]" />
              </button>
            </div>
          </div>

          {/* 100ml Card */}
          <div className="card pricing-card relative grid grid-cols-[auto_1fr] items-center gap-[16px] p-[28px] overflow-hidden bg-black rounded-[16px]">
            {/* Background radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_50%,rgba(196,130,58,0.16)_0%,rgba(196,130,58,0.04)_45%,transparent_75%)] pointer-events-none z-0" />
            
            {/* Visual Column */}
            <div className="pricing-img-col relative z-10 flex flex-col items-center flex-shrink-0 text-center">
              <div className="pricing-img-wrap relative w-[300px] height-[380px] flex justify-center items-center">
                {/* Glow effect background */}
                <div className="absolute left-[38%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(196,130,58,0.55)_0%,rgba(196,130,58,0.22)_45%,rgba(196,130,58,0)_72%)] z-0" />
                <Image
                  src="/assets/pricing-product-final.png"
                  alt="Crafted Sprays 100ml fragrance bottle"
                  width={220}
                  height={280}
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
                />
              </div>
              <p className="heading-serif text-gold pricing-price text-[24px] mt-[12px] mb-[2px]">₹2,000</p>
              <p className="text-text-secondary pricing-price-note text-[12px]">(All taxes included)</p>
            </div>

            {/* Info Column */}
            <div className="relative z-10 pl-[8px]">
              <h3 className="heading-serif pricing-size text-[38px] mb-[8px]">100ml</h3>
              <p className="text-text-secondary pricing-sub text-[11.5px] tracking-[.08em] uppercase mb-[18px]">
                Best Value For Daily Wear<br />And Long-Term Use
              </p>
              <span className="pricing-accent w-[36px] h-[2px] bg-gold mb-[18px] block" />
              
              <div className="pricing-features flex flex-col gap-[18px] mb-[28px]">
                <div className="pricing-feature flex items-center gap-[12px] text-[13.5px]">
                  <span className="w-[32px] h-[32px] rounded-full border border-border flex items-center justify-center text-gold flex-shrink-0">
                    <Star className="w-[15px] h-[15px]" />
                  </span>
                  <span className="text-text-secondary">Everything in 50ml</span>
                </div>
                <div className="pricing-feature flex items-center gap-[12px] text-[13.5px]">
                  <span className="w-[32px] h-[32px] rounded-full border border-border flex items-center justify-center text-gold flex-shrink-0">
                    <Tag className="w-[15px] h-[15px]" />
                  </span>
                  <span className="text-text-secondary">Better value per ml</span>
                </div>
                <div className="pricing-feature flex items-center gap-[12px] text-[13.5px]">
                  <span className="w-[32px] h-[32px] rounded-full border border-border flex items-center justify-center text-gold flex-shrink-0">
                    <Clock className="w-[15px] h-[15px]" />
                  </span>
                  <span className="text-text-secondary">Longer lasting supply</span>
                </div>
                <div className="pricing-feature flex items-center gap-[12px] text-[13.5px]">
                  <span className="w-[32px] h-[32px] rounded-full border border-border flex items-center justify-center text-gold flex-shrink-0">
                    <Truck className="w-[15px] h-[15px]" />
                  </span>
                  <span className="text-text-secondary">Delivered in 4 days</span>
                </div>
              </div>

              <button onClick={openComingSoon} className="btn-gold pricing-cta w-full justify-center whitespace-normal text-center">
                Start Discovery ₹2,000
                <ArrowRight className="icon w-[19px] h-[19px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Trust Row */}
        <div className="pricing-trust flex justify-center items-center gap-[10px] flex-wrap text-[12.5px] text-text-secondary mt-[36px]">
          <span className="flex items-center gap-[6px]">
            <ShieldCheck className="w-[15px] h-[15px] text-gold" />
            100% Secure Checkout
          </span>
          <span className="dot text-border">•</span>
          <span>Premium Ingredients</span>
          <span className="dot text-border">•</span>
          <span>Crafted Just For You</span>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="container block lg:hidden">
        <div className="mobile-pricing-extra">
          {/* Header */}
          <div className="text-center mb-[32px]">
            <p className="eyebrow justify-center mb-[10px]">Pricing Options</p>
            <h2 className="heading-serif text-[26px] leading-[1.2] m-0">
              Crafted for You, Bottled Your Way
            </h2>
            <p className="text-text-secondary text-[13px] leading-[1.55] mt-[12px]">
              Select the size that fits your signature scent needs.
            </p>
          </div>

          {/* Card 50ml stacked */}
          <div className="card mp-card overflow-hidden mb-[20px] bg-card border border-border rounded-[16px]">
            <div className="mp-img-wrap relative w-full aspect-square overflow-hidden bg-black flex items-center justify-center">
              {/* Gold glow effect in center */}
              <div className="absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(196,130,58,0.45)_0%,rgba(196,130,58,0.15)_45%,rgba(196,130,58,0)_72%)] z-0" />
              <Image
                src="/assets/pricing-product-mobile.png"
                alt="Crafted Sprays 50ml bottle"
                fill
                className="relative z-10 object-contain p-[20px] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div>
            
            <div className="mp-body p-[20px]">
              <div className="mp-head flex items-start justify-between gap-[10px] mb-[10px]">
                <div>
                  <h3 className="mp-size text-[19px] text-text-primary font-semibold mb-[4px]">50ml size</h3>
                  <p className="text-text-secondary text-[11px] uppercase tracking-wider">Perfect to discover</p>
                </div>
                <p className="mp-price text-[24px] text-gold font-bold heading-serif">₹1,200</p>
              </div>
              <p className="mp-sub text-text-secondary text-[12.5px] leading-[1.5] mb-[18px]">
                Perfect to discover your signature fragrance. Custom-crafted, premium glass bottle, and delivered in 4 days.
              </p>
              <button onClick={openComingSoon} className="mp-btn flex items-center justify-center gap-[8px] w-full border border-gold rounded-[8px] py-[14px] text-gold text-[14px] font-semibold">
                Start Discovery ₹1,200
                <ArrowRight className="w-[15px] h-[15px]" />
              </button>
            </div>
          </div>

          {/* Card 100ml stacked */}
          <div className="card mp-card overflow-hidden mb-[20px] bg-card border border-border rounded-[16px]">
            <div className="mp-img-wrap relative w-full aspect-square overflow-hidden bg-black flex items-center justify-center">
              {/* Gold glow effect in center */}
              <div className="absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(196,130,58,0.45)_0%,rgba(196,130,58,0.15)_45%,rgba(196,130,58,0)_72%)] z-0" />
              <Image
                src="/assets/pricing-product-mobile.png"
                alt="Crafted Sprays 100ml bottle"
                fill
                className="relative z-10 object-contain p-[20px] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div>
            
            <div className="mp-body p-[20px]">
              <div className="mp-head flex items-start justify-between gap-[10px] mb-[10px]">
                <div>
                  <h3 className="mp-size text-[19px] text-text-primary font-semibold mb-[4px]">100ml size</h3>
                  <p className="text-text-secondary text-[11px] uppercase tracking-wider">Best value pack</p>
                </div>
                <p className="mp-price text-[24px] text-gold font-bold heading-serif">₹2,000</p>
              </div>
              <p className="mp-sub text-text-secondary text-[12.5px] leading-[1.5] mb-[18px]">
                Recommended for daily wear. Twice the volume, better value per ml, and longer lasting fragrance supply.
              </p>
              <button onClick={openComingSoon} className="mp-btn flex items-center justify-center gap-[8px] w-full border border-gold rounded-[8px] py-[14px] text-gold text-[14px] font-semibold">
                Start Discovery ₹2,000
                <ArrowRight className="w-[15px] h-[15px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
