"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sparkle,
  ArrowRight,
  User,
  Leaf,
  Wind,
  Hourglass,
  Calendar,
  Clock,
  Sparkles,
  Link2,
  Truck,
  ShieldCheck,
  Lock,
  Award,
} from "lucide-react";

import { useComingSoon } from "@/components/coming-soon/coming-soon-provider";

export function Hero() {
  const { openComingSoon } = useComingSoon();
  return (
    <section id="hero" className="relative overflow-hidden min-h-[100vh] lg:min-h-0 pt-[110px] pb-[36px] lg:py-[72px] lg:pb-[90px] flex flex-col justify-center">
      {/* Background Images */}
      {/* Desktop Background */}
      <div className="absolute inset-0 hidden lg:block z-0">
        <Image
          src="/assets/hero-bg.png"
          alt="Crafted Sprays fragrance bottle on rock"
          fill
          className="object-cover object-[center_38%]"
          priority
        />
      </div>

      {/* Mobile Background */}
      <div className="absolute inset-0 block lg:hidden z-0">
        <Image
          src="/assets/mobile-hero-bg.png"
          alt="Crafted Sprays fragrance bottle on rock"
          fill
          className="object-cover object-[center_22%]"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#151311]/40 via-[#151311]/45 to-[#151311]/98 lg:bg-gradient-to-r lg:from-[#151311]/94 lg:via-[#151311]/50 lg:to-[#151311]/80 z-1" />

      {/* Hero Content Grid */}
      <div className="lg:my-[6rem] container z-10 hero-grid grid grid-cols-1 lg:grid-cols-[0.85fr_1.2fr] gap-[30px] lg:gap-[60px] items-center w-full max-w-[1500px]">
        {/* Left Side Info */}
        <div className="pt-[28px] lg:pt-0">
          <p className="eyebrow mb-[18px]">
            <Sparkle className="icon text-gold w-[15px] h-[15px]" />
            AI-Powered Scent Discovery
          </p>

          <h1 className="heading-serif hero-h1 text-[32px] sm:text-[44px] lg:text-[44px] leading-[1.1] mb-[20px]">
            The Best Fragrance<br />
            <span className="text-gold">Isn&apos;t</span> The Most<br />
            <span className="text-gold">Popular One.</span><br />
            It&apos;s The One That&apos;s<br />
            <span className="text-gold">Uniquely Yours</span>
          </h1>

          {/* Desktop Only Subtitle & CTAs */}
          <div className="hidden lg:block">
            <p className="text-text-secondary hero-sub text-[16px] leading-[1.7] mb-[30px] max-w-[420px]">
              Take a 5-minute discovery to get a fragrance crafted around your personality, preferences and lifestyle. Delivered to your doorstep.
            </p>
            <div className="hero-ctas flex gap-[14px] mb-[40px] flex-wrap">
              <button onClick={openComingSoon} className="btn-gold">
                Discover My Fragrance
                <ArrowRight className="icon w-[19px] h-[19px]" />
              </button>
              <Link href="/pricing" className="btn-outline">
                See Pricing
              </Link>
            </div>

            {/* Desktop Badges */}
            <div className="badge-row flex gap-[28px]">
              <div className="badge flex flex-col items-center text-center gap-[14px] flex-1">
                <div className="badge-icon w-[52px] h-[52px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-[20px] font-semibold text-gold">5</div>
                <div>
                  <p className="badge-title text-[14px] font-medium mb-[4px]">5-Minute Discovery</p>
                  <p className="badge-sub text-text-secondary text-[12px] line-height-[1.5]">Quick, simple and built around you.</p>
                </div>
              </div>
              <div className="badge flex flex-col items-center text-center gap-[14px] flex-1">
                <div className="badge-icon w-[52px] h-[52px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold">
                  <Sparkles className="icon w-[24px] h-[24px]" />
                </div>
                <div>
                  <p className="badge-title text-[14px] font-medium mb-[4px]">Personalised Formula</p>
                  <p className="badge-sub text-text-secondary text-[12px] line-height-[1.5]">Crafted uniquely for your profile.</p>
                </div>
              </div>
              <div className="badge flex flex-col items-center text-center gap-[14px] flex-1">
                <div className="badge-icon w-[52px] h-[52px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold">
                  <Truck className="icon w-[24px] h-[24px]" />
                </div>
                <div>
                  <p className="badge-title text-[14px] font-medium mb-[4px]">Delivered in 4 Days</p>
                  <p className="badge-sub text-text-secondary text-[12px] line-height-[1.5]">Premium fragrance, at your doorstep.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Only Extra Content */}
          <div className="mobile-hero-extra block lg:hidden mt-[8px]">
            <button onClick={openComingSoon} className="btn-gold mobile-cta-btn w-full justify-center mb-[28px] ">
              Start Discovery
              <ArrowRight className="icon w-[19px] h-[19px]" />
            </button>

            {/* Mobile Progress Steps Row */}
            <div className="mobile-steps-row flex items-start justify-between mb-[28px]">
              <div className="mobile-step flex flex-col items-center gap-[8px] text-center">
                <div className="mobile-step-icon w-[48px] h-[48px] rounded-full border border-border flex items-center justify-center flex-shrink-0 bg-[#151311]/40 text-gold">
                  <Sparkles className="w-[19px] h-[19px]" />
                </div>
                <p className="text-[12px] text-text-primary">Discover</p>
              </div>
              <ArrowRight className="icon mobile-step-arrow w-[16px] h-[16px] text-gold mt-[16px] flex-shrink-0 opacity-70" />

              <div className="mobile-step flex flex-col items-center gap-[8px] text-center">
                <div className="mobile-step-icon w-[48px] h-[48px] rounded-full border border-border flex items-center justify-center flex-shrink-0 bg-[#151311]/40 text-gold">
                  <User className="w-[19px] h-[19px]" />
                </div>
                <p className="text-[12px] text-text-primary">Profile</p>
              </div>
              <ArrowRight className="icon mobile-step-arrow w-[16px] h-[16px] text-gold mt-[16px] flex-shrink-0 opacity-70" />

              <div className="mobile-step flex flex-col items-center gap-[8px] text-center">
                <div className="mobile-step-icon w-[48px] h-[48px] rounded-full border border-border flex items-center justify-center flex-shrink-0 bg-[#151311]/40 text-gold">
                  <Sparkle className="w-[19px] h-[19px]" />
                </div>
                <p className="text-[12px] text-text-primary">Crafted</p>
              </div>
              <ArrowRight className="icon mobile-step-arrow w-[16px] h-[16px] text-gold mt-[16px] flex-shrink-0 opacity-70" />

              <div className="mobile-step flex flex-col items-center gap-[8px] text-center">
                <div className="mobile-step-icon w-[48px] h-[48px] rounded-full border border-border flex items-center justify-center flex-shrink-0 bg-[#151311]/40 text-gold">
                  <Truck className="w-[19px] h-[19px]" />
                </div>
                <p className="text-[12px] text-text-primary">Delivered</p>
              </div>
            </div>

            {/* Mobile Testimonial Box */}
            <div className="card mobile-testi p-[18px] mb-[14px] bg-[#24201d]/70">
              <div className="stars text-gold text-[13px] mb-[6px]">★★★★★</div>
              <p className="mobile-testi-quote text-[13.5px] leading-[1.6] my-[8px] mx-0">
                &ldquo;Finally found a fragrance that felt like me.&rdquo;
              </p>
              <p className="text-text-secondary mobile-testi-name text-[12px]">
                Rishabh S. &middot; Bengaluru
              </p>
            </div>
            <p className="text-text-secondary mobile-trust-line text-[12.5px] mb-[24px] text-center">
              Trusted by thousands of customers across India
            </p>

            {/* Mobile Trust Badges */}
            <div className="mobile-trust-row flex flex-row items-start justify-between gap-[6px] pt-[20px] border-t border-border">
              <div className="mobile-trust-item flex flex-col items-center text-center gap-[10px] flex-1 min-w-0">
                <div className="mobile-trust-icon w-[38px] h-[38px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold">
                  <ShieldCheck className="w-[17px] h-[17px]" />
                </div>
                <div>
                  <p className="mobile-trust-title text-[12px] font-semibold leading-[1.3]">100% Personalised</p>
                  <p className="text-text-secondary mobile-trust-sub text-[10.5px] leading-[1.3]">Built around you</p>
                </div>
              </div>
              <div className="mobile-trust-item flex flex-col items-center text-center gap-[10px] flex-1 min-w-0">
                <div className="mobile-trust-icon w-[38px] h-[38px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold">
                  <Lock className="w-[17px] h-[17px]" />
                </div>
                <div>
                  <p className="mobile-trust-title text-[12px] font-semibold leading-[1.3]">Private &amp; Secure</p>
                  <p className="text-text-secondary mobile-trust-sub text-[10.5px] leading-[1.3]">Your data is safe</p>
                </div>
              </div>
              <div className="mobile-trust-item flex flex-col items-center text-center gap-[10px] flex-1 min-w-0">
                <div className="mobile-trust-icon w-[38px] h-[38px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold">
                  <Award className="w-[17px] h-[17px]" />
                </div>
                <div>
                  <p className="mobile-trust-title text-[12px] font-semibold leading-[1.3]">Premium Quality</p>
                  <p className="text-text-secondary mobile-trust-sub text-[10.5px] leading-[1.3]">Crafted with care</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Cards (Desktop Only) */}
        <div className="hero-cards hidden lg:flex flex-col gap-[14px] max-w-[560px] w-full ml-auto mr-[28px] self-start mt-[-32px]">
          {/* Profile Card */}
          <div className="card-glow p-[24px]">
            <div className="flex justify-between items-center mb-[14px]">
              <h3 className="heading-serif text-[18.5px] font-medium">Kunaal&apos;s Fragrance Profile</h3>
              <div className="w-[34px] h-[34px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold">
                <User className="w-[16px] h-[16px]" />
              </div>
            </div>

            {/* Personality Traits */}
            <div>
              <p className="eyebrow mb-[14px]">Personality</p>

              <div className="trait mb-[8px]">
                <div className="flex justify-between text-[12.5px] mb-[4px]">
                  <span className="text-text-secondary">Minimalist</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="flex-1 h-[5px] rounded-[3px] bg-border overflow-hidden">
                    <div className="h-full bg-gold rounded-[3px]" style={{ width: "70%" }} />
                  </div>
                  <span className="text-[12px] w-[30px] text-text-secondary">70%</span>
                </div>
              </div>

              <div className="trait mb-[8px]">
                <div className="flex justify-between text-[12.5px] mb-[4px]">
                  <span className="text-text-secondary">Power Player</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="flex-1 h-[5px] rounded-[3px] bg-border overflow-hidden">
                    <div className="h-full bg-gold rounded-[3px]" style={{ width: "60%" }} />
                  </div>
                  <span className="text-[12px] w-[30px] text-text-secondary">60%</span>
                </div>
              </div>

              <div className="trait mb-[8px]">
                <div className="flex justify-between text-[12.5px] mb-[4px]">
                  <span className="text-text-secondary">Romantic Charmer</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="flex-1 h-[5px] rounded-[3px] bg-border overflow-hidden">
                    <div className="h-full bg-gold rounded-[3px]" style={{ width: "35%" }} />
                  </div>
                  <span className="text-[12px] w-[30px] text-text-secondary">35%</span>
                </div>
              </div>

              <div className="trait mb-[8px]">
                <div className="flex justify-between text-[12.5px] mb-[4px]">
                  <span className="text-text-secondary">Comfort Seeker</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="flex-1 h-[5px] rounded-[3px] bg-border overflow-hidden">
                    <div className="h-full bg-gold rounded-[3px]" style={{ width: "20%" }} />
                  </div>
                  <span className="text-[12px] w-[30px] text-text-secondary">20%</span>
                </div>
              </div>

              <div className="trait mb-[8px]">
                <div className="flex justify-between text-[12.5px] mb-[4px]">
                  <span className="text-text-secondary">Playful Energiser</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="flex-1 h-[5px] rounded-[3px] bg-border overflow-hidden">
                    <div className="h-full bg-gold rounded-[3px]" style={{ width: "80%" }} />
                  </div>
                  <span className="text-[12px] w-[30px] text-text-secondary">80%</span>
                </div>
              </div>
            </div>

            <hr className="divider my-[15px]" />

            {/* Desired Impression */}
            <div>
              <p className="eyebrow mb-[14px]">Desired Impression</p>
              <div className="flex flex-wrap gap-[7px] mb-0">
                <span className="text-[12.5px] py-[5px] px-[12px] rounded-[20px] border border-border">Confident</span>
                <span className="text-[12.5px] py-[5px] px-[12px] rounded-[20px] border border-border">Professional</span>
                <span className="text-[12.5px] py-[5px] px-[12px] rounded-[20px] border border-border">Approachable</span>
              </div>
            </div>

            <hr className="divider my-[15px]" />

            {/* Fragrance Family */}
            <div className="flex justify-between items-center">
              <div>
                <p className="eyebrow mb-[8px]">Fragrance Family</p>
                <p className="heading-serif text-gold text-[21px]">Fresh Woody Citrus</p>
              </div>
              <Leaf className="w-[24px] h-[24px] text-gold" />
            </div>
          </div>

          {/* Fragrance Details Card */}
          <div className="card-glow p-[18px_22px]">
            <div className="flex justify-between items-center mb-[10px]">
              <h3 className="heading-serif text-[18.5px] font-medium">Your Crafted Fragrance</h3>
              <div className="w-[34px] h-[34px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-gold">
                <Sparkles className="w-[16px] h-[16px]" />
              </div>
            </div>

            <div className="flex gap-[6px] items-stretch flex-row">
              {/* Note Details list */}
              <div className="flex-1 flex flex-col gap-[12px]">
                <div className="flex gap-[10px]">
                  <Sparkle className="w-[18px] h-[18px] text-gold mt-[2px] flex-shrink-0" />
                  <div>
                    <p className="text-[14.5px] font-medium text-text-primary">Fresh Woody Citrus</p>
                    <p className="text-[12px] text-text-secondary">Fragrance Direction</p>
                  </div>
                </div>
                <div className="flex gap-[10px]">
                  <Link2 className="w-[18px] h-[18px] text-gold mt-[2px] flex-shrink-0" />
                  <div>
                    <p className="text-[14.5px] font-medium text-text-primary">Bergamot, Vetiver, Cedarwood</p>
                    <p className="text-[12px] text-text-secondary">Key Notes</p>
                  </div>
                </div>
                <div className="flex gap-[10px]">
                  <User className="w-[18px] h-[18px] text-gold mt-[2px] flex-shrink-0" />
                  <div>
                    <p className="text-[14.5px] font-medium text-text-primary">Work, Travel, Everyday</p>
                    <p className="text-[12px] text-text-secondary">Best For</p>
                  </div>
                </div>
              </div>

              {/* Scent Pyramid Visuals (Merged layout with alignment fix) */}
              <div className="flex-[2.2] flex items-stretch h-[190px]">
                <div className="relative flex-shrink-0 gap-0 h-full flex items-center justify-center">
                  <Image
                    src="/assets/scent-pyramid-tight.png"
                    alt="Scent pyramid structure"
                    width={90}
                    height={190}
                    className="h-full w-auto object-contain"
                  />
                </div>
                {/* Connectors & Labels aligned exactly to top, mid, base segments of the pyramid */}
                <div className="relative flex-1 flex flex-col justify-between h-full pl-[6px]">
                  {/* Top Note Connector */}
                  <div className="flex items-start gap-[8px] pt-[8px] z-10">
                    <span className="block h-[1px] bg-border w-[38px] mt-[10px] flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-gold uppercase tracking-wider mb-[1px]">Top Note</p>
                      <p className="text-[12px] font-medium leading-[1.2]">Bergamot</p>
                      <p className="text-[11px] text-text-secondary leading-[1.2]">Lemon</p>
                    </div>
                  </div>
                  {/* Middle Note Connector */}
                  <div className="flex items-start gap-[8px] py-[4px] z-10">
                    <span className="block h-[1px] bg-border w-[38px] mt-[10px] flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-gold uppercase tracking-wider mb-[1px]">Middle Note</p>
                      <p className="text-[12px] font-medium leading-[1.2]">Lavender</p>
                      <p className="text-[11px] text-text-secondary leading-[1.2]">Ginger</p>
                    </div>
                  </div>
                  {/* Base Note Connector */}
                  <div className="flex items-start gap-[8px] pb-[8px] z-10">
                    <span className="block h-[1px] bg-border w-[38px] mt-[10px] flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-gold uppercase tracking-wider mb-[1px]">Base Note</p>
                      <p className="text-[12px] font-medium leading-[1.2]">Vetiver, Cedar</p>
                      <p className="text-[11px] text-text-secondary leading-[1.2]">Musk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="divider my-[14px]" />

            {/* Pyramid Metadata footer */}
            <div className="flex justify-between text-[12px] text-text-secondary flex-wrap gap-[6px]">
              <span className="flex items-center gap-[6px]">
                <span className="w-[24px] h-[24px] rounded-full border border-border flex items-center justify-center text-[11px] text-gold flex-shrink-0"><Wind className="w-[12px] h-[12px]" /></span>
                <span><span className="text-gold font-semibold">Projection</span> &middot; Moderate</span>
              </span>
              <span className="flex items-center gap-[6px]">
                <span className="w-[24px] h-[24px] rounded-full border border-border flex items-center justify-center text-[11px] text-gold flex-shrink-0"><Hourglass className="w-[12px] h-[12px]" /></span>
                <span><span className="text-gold font-semibold">Longevity</span> &middot; 8+ Hours</span>
              </span>
              <span className="flex items-center gap-[6px]">
                <span className="w-[24px] h-[24px] rounded-full border border-border flex items-center justify-center text-[11px] text-gold flex-shrink-0"><Calendar className="w-[12px] h-[12px]" /></span>
                <span><span className="text-gold font-semibold">Best Season</span> &middot; Spring/Summer</span>
              </span>
              <span className="flex items-center gap-[6px]">
                <span className="w-[24px] h-[24px] rounded-full border border-border flex items-center justify-center text-[11px] text-gold flex-shrink-0"><Clock className="w-[12px] h-[12px]" /></span>
                <span><span className="text-gold font-semibold">Best Time</span> &middot; Daytime</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Steps Card (Desktop Only) */}
      <div className="container relative z-10 hero-steps-wrap mt-[100px] hidden lg:block">
        <div className="hero-steps-card card flex items-start gap-[28px] p-[34px_44px] rounded-[36px] bg-[#151311]/55 backdrop-blur-md">
          <div className="hero-step flex items-start gap-[16px] flex-1">
            <div className="hero-step-num w-[46px] h-[46px] rounded-full border border-border flex items-center justify-center text-[18px] text-gold heading-serif flex-shrink-0">01</div>
            <div>
              <p className="hero-step-title text-[15px] font-semibold mb-[6px]">Take the 5-Minute Discovery</p>
              <p className="hero-step-sub text-text-secondary text-[13px] leading-[1.6]">Answer a few simple questions about your personality, lifestyle and preferences.</p>
            </div>
          </div>
          <div className="hero-step-divider flex-[0_0_auto] w-[60px] h-[1px] border-t-2 border-dashed border-gold mt-[23px] opacity-70" />

          <div className="hero-step flex items-start gap-[16px] flex-1">
            <div className="hero-step-num w-[46px] h-[46px] rounded-full border border-border flex items-center justify-center text-[18px] text-gold heading-serif flex-shrink-0">02</div>
            <div>
              <p className="hero-step-title text-[15px] font-semibold mb-[6px]">We Craft Your Fragrance Profile</p>
              <p className="hero-step-sub text-text-secondary text-[13px] leading-[1.6]">Our AI analyses 50+ data points to build a profile that defines what suits you.</p>
            </div>
          </div>
          <div className="hero-step-divider flex-[0_0_auto] w-[60px] h-[1px] border-t-2 border-dashed border-gold mt-[23px] opacity-70" />

          <div className="hero-step flex items-start gap-[16px] flex-1">
            <div className="hero-step-num w-[46px] h-[46px] rounded-full border border-border flex items-center justify-center text-[18px] text-gold heading-serif flex-shrink-0">03</div>
            <div>
              <p className="hero-step-title text-[15px] font-semibold mb-[6px]">Your Fragrance, Crafted &amp; Delivered</p>
              <p className="hero-step-sub text-text-secondary text-[13px] leading-[1.6]">We artisanally craft your perfume and deliver it to your doorstep in 4 days.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
