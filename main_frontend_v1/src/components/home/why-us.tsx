"use client";

import Link from "next/link";
import { User, Sparkle, Leaf, Star, ShieldCheck, Minus } from "lucide-react";
import { useComingSoon } from "@/components/coming-soon/coming-soon-provider";

export function WhyUs() {
  const { openComingSoon } = useComingSoon();
  return (
    <section id="why-us" className="py-[60px] lg:py-[90px] bg-bg">
      {/* Desktop Layout */}
      <div className="container hidden lg:block">
        <div className="whyus-grid grid grid-cols-[0.85fr_1.15fr] gap-[56px] items-start mb-[60px]">
          {/* Left Text Column */}
          <div>
            <p className="eyebrow mb-[18px]">The Crafted Difference</p>
            <h2 className="heading-serif text-[34px] leading-[1.2] mb-[22px]">
              Most Fragrance Decisions Start With <span className="text-gold">Everyone Else.</span>
            </h2>
            <p className="text-text-secondary text-[15px] leading-[1.7] mb-[20px]">
              Most people choose fragrance the same way they choose restaurants, movies, or gadgets. Recommendations. Reviews. Popularity. The more people like something, the safer it feels.
            </p>
            <p className="text-[15px] leading-[1.7] mb-[20px]">
              A fragrance that works for someone else isn&apos;t guaranteed to work for you. Because fragrance isn&apos;t just about smell. It&apos;s about you.
            </p>
            
            {/* Columns Row */}
            <div className="mini-cols flex gap-[28px] mt-[32px]">
              <div className="mini-col border-t-2 border-gold pt-[12px] flex-1">
                <p className="text-[12.5px] font-semibold mb-[4px]">Way You Decide</p>
                <p className="text-text-secondary text-[11.5px] leading-[1.5]">Influenced by trends, ads and reviews</p>
              </div>
              <div className="mini-col border-t-2 border-gold pt-[12px] flex-1">
                <p className="text-[12.5px] font-semibold mb-[4px]">How This Works</p>
                <p className="text-text-secondary text-[11.5px] leading-[1.5]">We replace guesswork with understanding</p>
              </div>
              <div className="mini-col border-t-2 border-gold pt-[12px] flex-1">
                <p className="text-[12.5px] font-semibold mb-[4px]">What You Get</p>
                <p className="text-text-secondary text-[11.5px] leading-[1.5]">A profile built only around you</p>
              </div>
            </div>
          </div>

          {/* Right Comparison Card (Improved alignment and spacing) */}
          <div className="card compare-card overflow-hidden">
            <div className="compare-grid grid grid-cols-2">
              {/* Traditional buying column */}
              <div className="compare-col left p-[28px_32px] border-r border-border">
                <p className="text-text-secondary compare-label text-[11px] tracking-[.1em] uppercase mb-[4px]">Traditional</p>
                <h3 className="heading-serif compare-title text-[20px] mb-[24px]">Fragrance Buying</h3>
                
                <div className="flex flex-col gap-[18px]">
                  <div className="compare-row flex items-center gap-[12px]">
                    <span className="compare-circle w-[26px] h-[26px] rounded-full border border-border flex items-center justify-center text-text-secondary flex-shrink-0 text-[13px]">
                      <Minus className="w-[14px] h-[14px]" />
                    </span>
                    <span className="text-text-secondary text-[13.5px]">Recommendations</span>
                  </div>
                  <div className="compare-row flex items-center gap-[12px]">
                    <span className="compare-circle w-[26px] h-[26px] rounded-full border border-border flex items-center justify-center text-text-secondary flex-shrink-0 text-[13px]">
                      <Minus className="w-[14px] h-[14px]" />
                    </span>
                    <span className="text-text-secondary text-[13.5px]">Reviews</span>
                  </div>
                  <div className="compare-row flex items-center gap-[12px]">
                    <span className="compare-circle w-[26px] h-[26px] rounded-full border border-border flex items-center justify-center text-text-secondary flex-shrink-0 text-[13px]">
                      <Minus className="w-[14px] h-[14px]" />
                    </span>
                    <span className="text-text-secondary text-[13.5px]">Popularity</span>
                  </div>
                  <div className="compare-row flex items-center gap-[12px]">
                    <span className="compare-circle w-[26px] h-[26px] rounded-full border border-border flex items-center justify-center text-text-secondary flex-shrink-0 text-[13px]">
                      <Minus className="w-[14px] h-[14px]" />
                    </span>
                    <span className="text-text-secondary text-[13.5px]">Best Seller Lists</span>
                  </div>
                  <div className="compare-row flex items-center gap-[12px]">
                    <span className="compare-circle w-[26px] h-[26px] rounded-full border border-border flex items-center justify-center text-text-secondary flex-shrink-0 text-[13px]">
                      <Minus className="w-[14px] h-[14px]" />
                    </span>
                    <span className="text-text-secondary text-[13.5px]">One Fragrance For Millions</span>
                  </div>
                </div>
              </div>

              {/* Crafted Sprays column */}
              <div className="compare-col right p-[28px_32px] bg-gold/[0.04]">
                <p className="text-gold compare-label text-[11px] tracking-[.1em] uppercase mb-[4px]">Crafted Sprays</p>
                <h3 className="heading-serif compare-title text-[20px] mb-[24px]">Starts With You</h3>
                
                <div className="flex flex-col gap-[18px]">
                  <div className="compare-row start flex items-start gap-[12px]">
                    <span className="compare-circle gold w-[26px] h-[26px] rounded-full border border-gold flex items-center justify-center text-gold flex-shrink-0 text-[13px] mt-[1px]">
                      <User className="w-[14px] h-[14px]" />
                    </span>
                    <div>
                      <p className="compare-item-title text-[13.5px] font-medium">Personality</p>
                      <p className="compare-item-sub text-text-secondary text-[11.5px] leading-[1.5]">We start with understanding you</p>
                    </div>
                  </div>
                  <div className="compare-row start flex items-start gap-[12px]">
                    <span className="compare-circle gold w-[26px] h-[26px] rounded-full border border-gold flex items-center justify-center text-gold flex-shrink-0 text-[13px] mt-[1px]">
                      <Sparkle className="w-[14px] h-[14px]" />
                    </span>
                    <div>
                      <p className="compare-item-title text-[13.5px] font-medium">Preferences</p>
                      <p className="compare-item-sub text-text-secondary text-[11.5px] leading-[1.5]">Your scent likes, dislikes and comfort zone</p>
                    </div>
                  </div>
                  <div className="compare-row start flex items-start gap-[12px]">
                    <span className="compare-circle gold w-[26px] h-[26px] rounded-full border border-gold flex items-center justify-center text-gold flex-shrink-0 text-[13px] mt-[1px]">
                      <Leaf className="w-[14px] h-[14px]" />
                    </span>
                    <div>
                      <p className="compare-item-title text-[13.5px] font-medium">Lifestyle</p>
                      <p className="compare-item-sub text-text-secondary text-[11.5px] leading-[1.5]">Your life, climate, occasions and environments</p>
                    </div>
                  </div>
                  <div className="compare-row start flex items-start gap-[12px]">
                    <span className="compare-circle gold w-[26px] h-[26px] rounded-full border border-gold flex items-center justify-center text-gold flex-shrink-0 text-[13px] mt-[1px]">
                      <Star className="w-[14px] h-[14px]" />
                    </span>
                    <div>
                      <p className="compare-item-title text-[13.5px] font-medium">Desired Impression</p>
                      <p className="compare-item-sub text-text-secondary text-[11.5px] leading-[1.5]">The impression you want to leave behind</p>
                    </div>
                  </div>
                  <div className="compare-row start flex items-start gap-[12px]">
                    <span className="compare-circle gold w-[26px] h-[26px] rounded-full border border-gold flex items-center justify-center text-gold flex-shrink-0 text-[13px] mt-[1px]">
                      <ShieldCheck className="w-[14px] h-[14px]" />
                    </span>
                    <div>
                      <p className="compare-item-title text-[13.5px] font-medium">One Profile Built Around You</p>
                      <p className="compare-item-sub text-text-secondary text-[11.5px] leading-[1.5]">Made and priced just for you</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Card Call-to-action */}
        <div className="card banner-card relative flex items-center p-[48px] min-h-[260px] overflow-hidden rounded-[16px] bg-bg-alt">
          {/* Custom style to background image to prevent tailwind config dependency */}
          <div className="absolute inset-0 bg-[url('/assets/cta-banner-bg.png')] bg-right bg-cover bg-no-repeat z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151311]/92 via-[#151311]/72 to-transparent z-1" />
          
          <div className="relative z-10 mx-auto max-w-[560px] text-center">
            <p className="heading-serif text-[26px] mb-[14px] leading-[1.3] text-text-primary">
              The Difference Between A Good Fragrance And The <span className="text-gold">Right Fragrance Is You.</span>
            </p>
            <p className="text-text-secondary text-[14.5px] leading-[1.7] mb-[24px]">
              A good fragrance smells pleasant. The right fragrance feels like it&apos;s yours - like you&apos;ve finally found something that fits.
            </p>
            <div className="mt-[22px] flex justify-center">
              <button onClick={openComingSoon} className="btn-gold">
                Make It Yours For ₹1200 Only
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="container block lg:hidden">
        <div className="mobile-why-extra">
          <div className="mwhy-head text-center mb-[26px]">
            <p className="eyebrow mb-[10px]">The Crafted Difference</p>
            <h2 className="heading-serif text-[26px] leading-[1.2] m-0">
              Most Fragrance Decisions Start With <span className="text-gold">Everyone Else.</span>
            </h2>
            <div className="mwhy-divider block w-[54px] height-[1px] bg-gold/50 my-[16px] mx-auto relative after:content-[''] after:absolute after:left-[50%] after:top-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[5px] after:h-[5px] after:rounded-full after:bg-gold" />
            <p className="text-text-secondary text-[13px] leading-[1.55] mt-[16px]">
              Most people choose fragrance based on reviews, trends, and bestseller lists. We believe choosing a fragrance should start with understanding you.
            </p>
          </div>

          {/* Mobile Vs Column Comparison */}
          <div className="mwhy-compare relative flex gap-[12px] mb-[24px] items-stretch">
            {/* Traditional Column */}
            <div className="mwhy-col flex-1 min-w-0 border border-border rounded-[14px] p-[18px_14px] bg-card">
              <p className="mwhy-col-label text-[9.5px] tracking-[.07em] uppercase text-text-secondary mb-[14px] whitespace-nowrap">Traditional</p>
              <div className="mwhy-item flex items-center gap-[7px] mb-[12px] text-[11.5px] text-text-secondary">
                <Minus className="w-[14px] h-[14px] flex-shrink-0" />
                <span>Reviews</span>
              </div>
              <div className="mwhy-item flex items-center gap-[7px] mb-[12px] text-[11.5px] text-text-secondary">
                <Minus className="w-[14px] h-[14px] flex-shrink-0" />
                <span>Trends</span>
              </div>
              <div className="mwhy-item flex items-center gap-[7px] mb-[12px] text-[11.5px] text-text-secondary">
                <Minus className="w-[14px] h-[14px] flex-shrink-0" />
                <span>Bestsellers</span>
              </div>
              
              <div className="mwhy-arrow-row flex items-center gap-[6px] my-[12px]">
                <div className="mwhy-line flex-1 h-[1px] bg-border" />
              </div>
              <p className="mwhy-result-text text-center text-[11.5px] text-text-primary leading-[1.4]">
                One scent for millions
              </p>
            </div>

            {/* VS Circle */}
            <div className="mwhy-vs absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[38px] h-[38px] rounded-full border border-gold bg-[#151311] flex items-center justify-center text-[11.5px] font-bold text-gold z-[2]">
              VS
            </div>

            {/* Crafted Sprays Column */}
            <div className="mwhy-col mwhy-col-cs flex-1 min-w-0 border border-gold rounded-[14px] p-[18px_14px] bg-card">
              <p className="mwhy-col-label text-[9.5px] tracking-[.07em] uppercase text-gold mb-[14px] whitespace-nowrap">Crafted Sprays</p>
              <div className="mwhy-item gold flex items-center gap-[7px] mb-[12px] text-[11.5px] text-text-primary">
                <User className="w-[14px] h-[14px] text-gold flex-shrink-0" />
                <span>Personality</span>
              </div>
              <div className="mwhy-item gold flex items-center gap-[7px] mb-[12px] text-[11.5px] text-text-primary">
                <Sparkle className="w-[14px] h-[14px] text-gold flex-shrink-0" />
                <span>Preferences</span>
              </div>
              <div className="mwhy-item gold flex items-center gap-[7px] mb-[12px] text-[11.5px] text-text-primary">
                <Leaf className="w-[14px] h-[14px] text-gold flex-shrink-0" />
                <span>Lifestyle</span>
              </div>
              
              <div className="mwhy-arrow-row gold flex items-center gap-[6px] my-[12px]">
                <div className="mwhy-line flex-1 h-[1px] bg-gold/40" />
              </div>
              <p className="mwhy-result-text text-center text-[11.5px] text-text-primary leading-[1.4]">
                Made uniquely for you
              </p>
            </div>
          </div>

          {/* Mobile Feature Description Cards */}
          <div className="mwhy-features flex flex-col gap-[14px] mb-[20px]">
            <div className="mwhy-feature flex items-start gap-[14px] p-[18px] border border-border rounded-[14px] bg-card">
              <div className="mwhy-feature-icon w-[46px] h-[46px] rounded-full border border-gold flex items-center justify-center flex-shrink-0 text-gold">
                <User className="w-[19px] h-[19px]" />
              </div>
              <div>
                <h3 className="mwhy-feature-title text-[16px] text-gold font-semibold mb-[4px]">Personality</h3>
                <p className="mwhy-feature-sub text-[12px] leading-[1.45] text-text-secondary">
                  We look at your profile, traits, and desired impression.
                </p>
              </div>
            </div>

            <div className="mwhy-feature flex items-start gap-[14px] p-[18px] border border-border rounded-[14px] bg-card">
              <div className="mwhy-feature-icon w-[46px] h-[46px] rounded-full border border-gold flex items-center justify-center flex-shrink-0 text-gold">
                <Sparkle className="w-[19px] h-[19px]" />
              </div>
              <div>
                <h3 className="mwhy-feature-title text-[16px] text-gold font-semibold mb-[4px]">Preferences</h3>
                <p className="mwhy-feature-sub text-[12px] leading-[1.45] text-text-secondary">
                  Your ingredient likes, dislikes, and comfort boundaries.
                </p>
              </div>
            </div>

            <div className="mwhy-feature flex items-start gap-[14px] p-[18px] border border-border rounded-[14px] bg-card">
              <div className="mwhy-feature-icon w-[46px] h-[46px] rounded-full border border-gold flex items-center justify-center flex-shrink-0 text-gold">
                <Leaf className="w-[19px] h-[19px]" />
              </div>
              <div>
                <h3 className="mwhy-feature-title text-[16px] text-gold font-semibold mb-[4px]">Lifestyle</h3>
                <p className="mwhy-feature-sub text-[12px] leading-[1.45] text-text-secondary">
                  Occasions, climate, work environment, and usage pattern.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Small Banner */}
          <div className="mwhy-banner flex items-center gap-[14px] p-[18px] border border-border rounded-[14px] bg-card">
            <div className="mwhy-banner-icon w-[42px] h-[42px] rounded-full border border-gold flex items-center justify-center flex-shrink-0 text-gold">
              <ShieldCheck className="w-[19px] h-[19px]" />
            </div>
            <p className="mwhy-banner-text text-[12px] leading-[1.5] text-text-primary">
              All formulas are individually crafted and backed by our suitability guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
