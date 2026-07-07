"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  User,
  Sparkles,
  Clock,
  LayoutGrid,
  HelpCircle,
  Leaf,
  Calendar,
  Heart,
  Star,
  X,
  Check,
  ArrowRight,
  Minus,
  Plus
} from "lucide-react";
import { useComingSoon } from "@/components/coming-soon/coming-soon-provider";

export function AboutUs() {
  const { openComingSoon } = useComingSoon();
  const [expandedBelief, setExpandedBelief] = useState<number | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-item");
    elements.forEach((el) => io.observe(el));

    return () => {
      elements.forEach((el) => io.unobserve(el));
    };
  }, []);

  const toggleBelief = (index: number) => {
    if (expandedBelief === index) {
      setExpandedBelief(null);
    } else {
      setExpandedBelief(index);
    }
  };

  const beliefs = [
    {
      num: "01",
      icon: <Clock className="w-[20px] h-[20px]" />,
      title: "Confidence Through Clarity",
      desc: "We believe nobody should need years of fragrance knowledge to make a decision they'll love. Our role isn't to tell you what to buy. It's to help you understand what truly suits you, so every decision feels informed, intentional and confident."
    },
    {
      num: "02",
      icon: <User className="w-[20px] h-[20px]" />,
      title: "Personal Over Popular",
      desc: "We don't believe popularity determines suitability. The right fragrance isn't the one everyone is talking about. It's the one that feels natural on the person wearing it. That's why we start with the individual, not the bestseller list."
    },
    {
      num: "03",
      icon: <HelpCircle className="w-[20px] h-[20px]" />,
      title: "Discovery Before Purchase",
      desc: "Buying should never come before understanding. Before recommending a fragrance, we believe it's important to understand who you are, how you live and the impression you want to leave."
    },
    {
      num: "04",
      icon: <LayoutGrid className="w-[20px] h-[20px]" />,
      title: "Technology With Purpose",
      desc: "Technology should make personal decisions more personal, not less. We use technology to better understand people and translate that understanding into recommendations that feel thoughtful, relevant and uniquely yours."
    },
    {
      num: "05",
      icon: <HelpCircle className="w-[20px] h-[20px]" />,
      title: "Originality Over Imitation",
      desc: "We don't believe the future of fragrance lies in copying someone else's success. Everyone deserves to discover a fragrance that reflects their own identity. Because individuality should never be an imitation."
    },
    {
      num: "06",
      icon: <Leaf className="w-[20px] h-[20px]" />,
      title: "Crafted With Intention",
      desc: "Every fragrance should feel like it was created for someone, not chosen from a shelf. Every decision is made with one purpose: creating something that genuinely feels like yours."
    }
  ];

  return (
    <div className="bg-bg text-text-primary overflow-x-hidden min-h-screen">
      {/* Local styles for smooth reveal transitions and active states */}
      <style dangerouslySetInnerHTML={{ __html: `
        .reveal-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-item.in {
          opacity: 1;
          transform: translateY(0);
        }
        .d1 { transition-delay: 0.08s; }
        .d2 { transition-delay: 0.16s; }
        .d3 { transition-delay: 0.24s; }
        .d4 { transition-delay: 0.32s; }
        
        @media (max-width: 640px) {
          .reveal-item {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}} />

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero relative grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-screen pt-[64px] lg:pt-[78px] bg-bg">
        {/* Left copy column */}
        <div className="hero-left relative z-10 flex flex-col justify-center px-6 py-12 lg:py-16 lg:px-[80px] bg-bg lg:bg-transparent">
          <h1 className="hero-title reveal-item heading-serif text-[30px] lg:text-[48px] xl:text-[64px] font-semibold leading-[1.05] lg:leading-[1.08] tracking-tight mb-0 text-text-primary">
            The Way Most<br />People Buy Perfume<br />
            <span className="text-gold italic font-medium">Doesn&apos;t Make Sense.</span>
          </h1>
          <div className="hero-divider reveal-item d1 hidden lg:block w-[120px] h-[1.5px] bg-gold/70 my-[28px]" />
          <p className="hero-sub reveal-item d2 text-[12px] lg:text-[14.5px] text-text-secondary leading-[1.55] lg:leading-[1.75] max-w-[175px] lg:max-w-[300px] my-5 lg:mt-0 lg:mb-[40px]">
            We&apos;ve made one of the most personal decisions in our lives one of the least personal ones.
          </p>
          <a
            href="#things"
            className="btn-gold reveal-item d3 w-fit py-[10px] lg:py-[13px] px-[18px] lg:px-[26px] rounded-full text-[11.5px] lg:text-[13.5px] font-medium text-[#1a1208] transition-all hover:scale-[1.01]"
          >
            Continue Reading ↓
          </a>
        </div>

        {/* Right image column */}
        <div className="hero-right relative overflow-hidden h-[405px] lg:h-auto min-h-[300px] lg:min-h-full">
          <Image
            src="/assets/bottle-on-rock.png"
            alt="Crafted Sprays bottle on rock"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[58%_center] lg:object-center filter brightness-[0.86] lg:brightness-100 contrast-[1.08] lg:contrast-100 saturate-[1.06] lg:saturate-100"
          />
          {/* Gradients to blend image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#151311]/90 via-[#151311]/58 to-transparent max-lg:hidden z-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050403]/90 via-[#050403]/58 to-transparent lg:hidden z-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050403]/92 via-transparent to-transparent lg:hidden z-1" />
        </div>
      </section>

      {/* ═══════════ THINGS WE CHOOSE ═══════════ */}
      <section className="things bg-bg-alt pt-[24px] lg:pt-[90px] text-center" id="things">
        <h2 className="reveal-item heading-serif text-[22px] lg:text-[38px] xl:text-[52px] font-semibold text-text-primary leading-[1.15] lg:leading-[1.18] mb-[22px] lg:mb-[64px] px-[34px] lg:px-[80px]">
          The things we choose often become<br className="hidden lg:block" />an extension of who we are.
        </h2>

        {/* 4 elements row */}
        <div className="things-cols grid grid-cols-4 lg:grid-cols-4 border-t-0 lg:border-t border-gold/22 mx-[15px] lg:mx-0">
          {/* Clothes */}
          <div className="things-col reveal-item flex flex-col items-center justify-center text-center p-[10px_5px_16px] lg:p-[68px_42px_62px] min-h-[108px] lg:min-h-[430px] gap-[15px] lg:gap-[104px] border-r border-gold/20 lg:border-gold/15 last:border-r-0 bg-gradient-to-br from-[#0e0c08] to-[#080604] lg:from-transparent lg:to-transparent">
            <svg
              className="w-[30px] h-[30px] lg:w-[86px] lg:h-[86px] text-gold flex-shrink-0"
              viewBox="0 0 52 52"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M26 16 C26 13 28 11 31 11 C34 11 36 13 36 16" />
              <path d="M26 16 L7 33 C5 34.5 5 37 7 38 H45 C47 37 47 34.5 45 33 Z" />
              <path d="M26 11 C26 9 24.5 8 23 8" />
            </svg>
            <p className="text-[10.5px] lg:text-[24px] text-white/82 leading-[1.35] lg:leading-[1.45] mt-0">
              The clothes<br />we wear.
            </p>
          </div>

          {/* Homes */}
          <div className="things-col reveal-item d1 flex flex-col items-center justify-center text-center p-[10px_5px_16px] lg:p-[68px_42px_62px] min-h-[108px] lg:min-h-[430px] gap-[15px] lg:gap-[104px] border-r border-gold/20 lg:border-gold/15 last:border-r-0 bg-gradient-to-br from-[#0e0c08] to-[#080604] lg:from-transparent lg:to-transparent">
            <svg
              className="w-[30px] h-[30px] lg:w-[86px] lg:h-[86px] text-gold flex-shrink-0"
              viewBox="0 0 52 52"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="10" y="22" width="32" height="14" rx="3" />
              <path d="M10 26 A5 5 0 0 0 5 31 L5 36 H10" />
              <path d="M42 26 A5 5 0 0 1 47 31 L47 36 H42" />
              <path d="M10 30 H42" />
              <path d="M15 36 V41" />
              <path d="M37 36 V41" />
              <path d="M12 22 V18 Q12 15 15 15 H37 Q40 15 40 18 V22" />
            </svg>
            <p className="text-[10.5px] lg:text-[24px] text-white/82 leading-[1.35] lg:leading-[1.45] mt-0">
              The homes<br />we create.
            </p>
          </div>

          {/* Music */}
          <div className="things-col reveal-item d2 flex flex-col items-center justify-center text-center p-[10px_5px_16px] lg:p-[68px_42px_62px] min-h-[108px] lg:min-h-[430px] gap-[15px] lg:gap-[104px] border-r border-gold/20 lg:border-gold/15 last:border-r-0 bg-gradient-to-br from-[#0e0c08] to-[#080604] lg:from-transparent lg:to-transparent">
            <svg
              className="w-[30px] h-[30px] lg:w-[86px] lg:h-[86px] text-gold flex-shrink-0"
              viewBox="0 0 52 52"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 38 V18 L42 13 V33" />
              <circle cx="18" cy="38" r="4" />
              <circle cx="38" cy="33" r="4" />
            </svg>
            <p className="text-[10.5px] lg:text-[24px] text-white/82 leading-[1.35] lg:leading-[1.45] mt-0">
              The music<br />we listen to.
            </p>
          </div>

          {/* Coffee */}
          <div className="things-col reveal-item d3 flex flex-col items-center justify-center text-center p-[10px_5px_16px] lg:p-[68px_42px_62px] min-h-[108px] lg:min-h-[430px] gap-[15px] lg:gap-[104px] border-r border-gold/20 lg:border-gold/15 last:border-r-0 bg-gradient-to-br from-[#0e0c08] to-[#080604] lg:from-transparent lg:to-transparent">
            <svg
              className="w-[30px] h-[30px] lg:w-[86px] lg:h-[86px] text-gold flex-shrink-0"
              viewBox="0 0 52 52"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8 Q17 5 16 2" />
              <path d="M22 8 Q23 5 22 2" />
              <path d="M28 8 Q29 5 28 2" />
              <path d="M11 18 H35 L32 40 H14 Z" />
              <path d="M35 22 H40 Q46 22 46 29 Q46 36 40 36 H32" />
              <path d="M8 44 H44" />
            </svg>
            <p className="text-[10.5px] lg:text-[24px] text-white/82 leading-[1.35] lg:leading-[1.45] mt-0">
              Even the coffee<br />we order.
            </p>
          </div>
        </div>

        {/* Personalise card footer */}
        <div className="things-footer-wrap px-6 py-6 lg:py-[48px] bg-bg-alt">
          <div className="things-footer reveal-item flex flex-col items-center justify-center gap-4 lg:mx-[80px] border-0 lg:border border-border lg:rounded-[14px] p-0 lg:p-[52px_60px] min-h-auto lg:min-h-[160px]">
            <div className="things-footer-line hidden lg:block w-[44px] h-[1.5px] bg-gold/55" />
            <p className="text-[13px] lg:text-[17px] text-text-secondary leading-relaxed max-w-[250px] lg:max-w-none">
              We personalise them because they <span className="text-gold font-medium">reflect our identity.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ YET PERHAPS NOTHING ═══════════ */}
      <section className="yet grid grid-cols-2 lg:grid-cols-2 min-h-[270px] lg:min-h-[420px] border-t border-b border-white/6 lg:border-none">
        {/* Left Image column */}
        <div className="yet-left relative overflow-hidden min-h-[270px] lg:min-h-[520px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1207] to-[#080604]">
            <Image
              src="/assets/about-us-image.jpeg"
              alt="Warm golden fragrance trail"
              fill
              sizes="(max-width: 1024px) 50vw, 50vw"
              className="object-cover object-[41%_center] lg:object-center filter saturate-[1.04] contrast-[1.03]"
            />
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090705]/12 to-[#090705]/28 pointer-events-none" />
        </div>

        {/* Right copy column */}
        <div className="yet-right bg-gradient-to-br from-[#0d0b08] to-[#070604] p-[22px_17px] lg:p-[80px_72px] flex flex-col justify-center gap-[16px] lg:gap-[36px] border-l border-white/9 lg:border-none">
          <h2 className="reveal-item heading-serif text-[22px] lg:text-[38px] xl:text-[48px] font-semibold text-text-primary leading-[1.13] lg:leading-[1.15]">
            Yet perhaps nothing is<br />more personal than fragrance.
          </h2>
          <div className="yet-items flex flex-col gap-[11px] lg:gap-[26px]">
            {/* Item 1 */}
            <div className="yet-item reveal-item d1 flex items-start gap-[8px] lg:gap-[20px]">
              <div className="yet-item-icon w-[24px] h-[24px] lg:w-[42px] lg:h-[42px] rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 text-gold bg-gold/8 mt-0 lg:mt-[2px]">
                <User className="w-[12px] h-[12px] lg:w-[18px] lg:h-[18px]" />
              </div>
              <p className="text-[10.2px] lg:text-[18px] text-white/80 leading-[1.35] lg:leading-[1.6] pt-[1px] lg:pt-[8px]">
                It shapes first impressions.
              </p>
            </div>

            {/* Item 2 */}
            <div className="yet-item reveal-item d2 flex items-start gap-[8px] lg:gap-[20px]">
              <div className="yet-item-icon w-[24px] h-[24px] lg:w-[42px] lg:h-[42px] rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 text-gold bg-gold/8 mt-0 lg:mt-[2px]">
                <Clock className="w-[12px] h-[12px] lg:w-[18px] lg:h-[18px]" />
              </div>
              <p className="text-[10.2px] lg:text-[18px] text-white/80 leading-[1.35] lg:leading-[1.6] pt-[1px] lg:pt-[8px]">
                It creates lasting memories.
              </p>
            </div>

            {/* Item 3 */}
            <div className="yet-item reveal-item d3 flex items-start gap-[8px] lg:gap-[20px]">
              <div className="yet-item-icon w-[24px] h-[24px] lg:w-[42px] lg:h-[42px] rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 text-gold bg-gold/8 mt-0 lg:mt-[2px]">
                <Sparkles className="w-[12px] h-[12px] lg:w-[18px] lg:h-[18px]" />
              </div>
              <p className="text-[10.2px] lg:text-[18px] text-white/80 leading-[1.35] lg:leading-[1.6] pt-[1px] lg:pt-[8px]">
                Long after you&apos;ve left the room, it&apos;s often one of the things people remember about you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ VS COMPARISON ═══════════ */}
      <section className="vs-section p-[22px_14px] lg:p-[60px_80px] bg-bg">
        <div className="vs-card reveal-item border border-white/10 lg:rounded-[16px] bg-transparent lg:bg-bg-alt overflow-visible lg:overflow-hidden grid grid-cols-[1fr_34px_1fr] lg:grid-cols-[1fr_auto_1fr] items-stretch">
          
          {/* LEFT: Expected */}
          <div className="vs-side p-0 lg:p-[44px_52px] text-center lg:text-left">
            <p className="vs-side-title text-[12px] lg:text-[16px] font-semibold mb-[14px] lg:mb-[36px] tracking-wide text-gold">
              You&apos;d expect something so personal
            </p>
            <div className="vs-flow flex flex-col items-center lg:items-stretch gap-0">
              <div className="vs-row flex flex-col lg:flex-row items-center gap-[7px] lg:gap-[16px]">
                <div className="vs-row-icon w-[32px] h-[32px] lg:w-[52px] lg:h-[52px] rounded-[7px] lg:rounded-full border border-white/18 flex items-center justify-center flex-shrink-0 text-white/60">
                  <User className="w-[14px] h-[14px] lg:w-[22px] lg:h-[22px]" />
                </div>
                <p className="text-[9.3px] lg:text-[16px] text-white/78 leading-[1.25] lg:leading-normal">
                  Understand yourself
                </p>
              </div>
              
              <div className="vs-arrow ml-0 lg:ml-[70px] p-[8px_0] lg:p-[10px_0] text-gold lg:text-white/3 text-[13px] lg:text-[20px]">
                ↓
              </div>
              
              <div className="vs-row flex flex-col lg:flex-row items-center gap-[7px] lg:gap-[16px]">
                <div className="vs-row-icon w-[32px] h-[32px] lg:w-[52px] lg:h-[52px] rounded-[7px] lg:rounded-full border border-white/18 flex items-center justify-center flex-shrink-0 text-white/60">
                  <svg className="w-[14px] h-[14px] lg:w-[22px] lg:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M9 3h6l1 4H8L9 3z" />
                    <path d="M5 7h14l-1.5 12h-11L5 7z" />
                    <circle cx="10" cy="15" r="1.2" />
                  </svg>
                </div>
                <p className="text-[9.3px] lg:text-[16px] text-white/78 leading-[1.25] lg:leading-normal">
                  Choose fragrance
                </p>
              </div>
            </div>
          </div>

          {/* VS DIVIDER */}
          <div className="vs-divider w-[34px] lg:w-[64px] border-l border-r border-white/9 bg-transparent lg:bg-bg flex flex-col items-center justify-center">
            <div className="vs-circle w-[28px] h-[28px] lg:w-[52px] lg:h-[52px] rounded-full border border-gold/36 lg:border-white/22 bg-[#090705] lg:bg-bg flex items-center justify-center text-[9px] lg:text-[13px] font-semibold text-gold lg:text-white/70 tracking-widest">
              VS
            </div>
          </div>

          {/* RIGHT: Reality */}
          <div className="vs-side p-0 lg:p-[44px_52px] text-center lg:text-left">
            <p className="vs-side-title text-[12px] lg:text-[16px] font-semibold mb-[14px] lg:mb-[36px] tracking-wide text-text-primary">
              Instead, we begin somewhere else.
            </p>
            
            {/* 4 sources lists */}
            <div className="vs-multi flex flex-col lg:flex-row items-center lg:items-start gap-[5px] lg:gap-0 mb-[4px] lg:mb-[20px] flex-wrap">
              <div className="vs-multi-item w-[112px] lg:w-auto min-h-[26px] lg:min-h-0 border border-white/8 lg:border-none rounded-[6px] lg:rounded-none bg-white/2.5 lg:bg-transparent flex flex-row lg:flex-col justify-center lg:justify-start items-center gap-[6px] lg:gap-[8px] p-[5px_7px] lg:p-0">
                <div className="vs-multi-icon hidden lg:flex w-[52px] h-[52px] rounded-full border border-gold/45 bg-gold/8 text-gold items-center justify-center">
                  <Star className="w-[22px] h-[22px]" />
                </div>
                <span className="vs-multi-label text-[9px] lg:text-[13px] text-white/72 lg:text-text-secondary">Reviews</span>
              </div>
              <span className="vs-plus hidden lg:inline text-[16px] text-white/3 px-[10px] mt-[16px]">+</span>
              
              <div className="vs-multi-item w-[112px] lg:w-auto min-h-[26px] lg:min-h-0 border border-white/8 lg:border-none rounded-[6px] lg:rounded-none bg-white/2.5 lg:bg-transparent flex flex-row lg:flex-col justify-center lg:justify-start items-center gap-[6px] lg:gap-[8px] p-[5px_7px] lg:p-0">
                <div className="vs-multi-icon hidden lg:flex w-[52px] h-[52px] rounded-full border border-gold/45 bg-gold/8 text-gold items-center justify-center">
                  <User className="w-[22px] h-[22px]" />
                </div>
                <span className="vs-multi-label text-[9px] lg:text-[13px] text-white/72 lg:text-text-secondary">Recommendations</span>
              </div>
              <span className="vs-plus hidden lg:inline text-[16px] text-white/3 px-[10px] mt-[16px]">+</span>
              
              <div className="vs-multi-item w-[112px] lg:w-auto min-h-[26px] lg:min-h-0 border border-white/8 lg:border-none rounded-[6px] lg:rounded-none bg-white/2.5 lg:bg-transparent flex flex-row lg:flex-col justify-center lg:justify-start items-center gap-[6px] lg:gap-[8px] p-[5px_7px] lg:p-0">
                <div className="vs-multi-icon hidden lg:flex w-[52px] h-[52px] rounded-full border border-gold/45 bg-gold/8 text-gold items-center justify-center">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <span className="vs-multi-label text-[9px] lg:text-[13px] text-white/72 lg:text-text-secondary">Trending</span>
              </div>
              <span className="vs-plus hidden lg:inline text-[16px] text-white/3 px-[10px] mt-[16px]">+</span>
              
              <div className="vs-multi-item w-[112px] lg:w-auto min-h-[26px] lg:min-h-0 border border-white/8 lg:border-none rounded-[6px] lg:rounded-none bg-white/2.5 lg:bg-transparent flex flex-row lg:flex-col justify-center lg:justify-start items-center gap-[6px] lg:gap-[8px] p-[5px_7px] lg:p-0">
                <div className="vs-multi-icon hidden lg:flex w-[52px] h-[52px] rounded-full border border-gold/45 bg-gold/8 text-gold items-center justify-center">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M9 3h6l1 4H8L9 3z" />
                    <path d="M5 7h14l-1.5 12h-11L5 7z" />
                  </svg>
                </div>
                <span className="vs-multi-label text-[9px] lg:text-[13px] text-white/72 lg:text-text-secondary">Designer dupes</span>
              </div>
            </div>

            {/* Bracket connector (custom SVG - desktop only) */}
            <div className="vs-bracket-wrap hidden lg:flex flex-col items-center mt-[4px] mb-[4px]">
              <svg className="w-full h-[36px] block" viewBox="0 0 400 36" preserveAspectRatio="none" fill="none">
                <polyline points="16,0 16,18 200,18 384,18 384,0" stroke="rgba(196, 130, 58, 0.4)" strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="200" y1="18" x2="200" y2="36" stroke="rgba(196, 130, 58, 0.4)" strokeWidth="1.5" />
              </svg>
              <div className="text-[18px] text-gold/60 -mt-[2px] leading-none">↓</div>
            </div>

            {/* Choose fragrance container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-[7px] lg:gap-[16px] lg:justify-center">
              <div className="vs-row-icon w-[32px] h-[32px] lg:w-[52px] lg:h-[52px] rounded-[7px] lg:rounded-full border border-gold/45 bg-gold/8 text-gold flex items-center justify-center flex-shrink-0">
                <svg className="w-[14px] h-[14px] lg:w-[22px] lg:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
                  <path d="M9 3h6l1 4H8L9 3z" />
                  <path d="M5 7h14l-1.5 12h-11L5 7z" />
                  <circle cx="10" cy="15" r="1.2" fill="currentColor" />
                </svg>
              </div>
              <p className="text-[9.3px] lg:text-[16px] text-white/78 leading-[1.25] lg:leading-normal">
                Choose fragrance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SOMEWHERE ALONG THE WAY ═══════════ */}
      <section className="somewhere p-[24px_18px] lg:p-[90px_80px] bg-bg text-center border-t border-white/5 lg:border-none">
        <h2 className="reveal-item heading-serif text-[18px] lg:text-[28px] xl:text-[38px] text-text-primary leading-[1.15] lg:leading-[1.3] mb-[16px] lg:mb-[48px]">
          Somewhere along the way,<br />we stopped asking,
        </h2>
        <div className="quote-row reveal-item d1 grid grid-cols-[1fr_34px_1fr] lg:grid-cols-[1fr_auto_1fr] gap-0 items-stretch">
          <div className="quote-card bg-bg-alt border border-white/10 rounded-[6px] lg:rounded-[14px] p-[20px_10px] lg:p-[48px_44px] flex items-center justify-center min-h-[86px] lg:min-h-0">
            <p className="heading-serif text-[18px] lg:text-[22px] xl:text-[30px] font-medium leading-[1.1] lg:leading-[1.3] text-center text-text-primary">
              &quot;Does this<br />suit me?&quot;
            </p>
          </div>
          <div className="quote-arrow flex items-center justify-center p-0 lg:p-[0_-24px] margin-0 lg:m-[0_-22px] z-10">
            <div className="arrow-circle w-[34px] h-[34px] lg:w-[52px] lg:h-[52px] rounded-full bg-gradient-to-b from-[#d9aa5a] to-[#b8883a] flex items-center justify-center text-black font-semibold text-[14px] lg:text-[18px] flex-shrink-0 shadow-lg shadow-gold/40">
              →
            </div>
          </div>
          <div className="quote-card bg-[#2a1c08] border border-gold/25 rounded-[6px] lg:rounded-[14px] p-[20px_10px] lg:p-[48px_44px] flex items-center justify-center min-h-[86px] lg:min-h-0">
            <p className="heading-serif text-[18px] lg:text-[22px] xl:text-[30px] font-medium leading-[1.1] lg:leading-[1.3] text-center text-gold">
              &quot;What is<br />everyone else<br />wearing?&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ WE THINK FRAGRANCE DISCOVERY ═══════════ */}
      <section className="think grid grid-cols-[1fr_1.18fr] lg:grid-cols-2 min-h-0 lg:min-h-[560px] p-[25px_20px] lg:p-[80px_64px] bg-bg-alt border-t border-white/6 lg:border-none">
        <div className="think-left p-0 lg:p-[80px_80px] lg:pr-0 border-r border-white/9 lg:border-white/7 flex flex-col justify-start lg:justify-center gap-0">
          <span className="big reveal-item heading-serif text-[29px] lg:text-[56px] xl:text-[90px] font-semibold lg:font-bold leading-[1.03] lg:leading-[1.0] tracking-tight block text-text-primary">We Think</span>
          <span className="big reveal-item d1 heading-serif text-[29px] lg:text-[56px] xl:text-[90px] font-semibold lg:font-bold leading-[1.03] lg:leading-[1.0] tracking-tight block text-gold">Fragrance</span>
          <span className="big reveal-item d1 heading-serif text-[29px] lg:text-[56px] xl:text-[90px] font-semibold lg:font-bold leading-[1.03] lg:leading-[1.0] tracking-tight block text-gold">Discovery</span>
          <span className="big reveal-item d2 heading-serif text-[29px] lg:text-[56px] xl:text-[90px] font-semibold lg:font-bold leading-[1.03] lg:leading-[1.0] tracking-tight block text-text-primary">Should Work</span>
          <span className="big reveal-item d2 heading-serif text-[29px] lg:text-[56px] xl:text-[90px] font-semibold lg:font-bold leading-[1.03] lg:leading-[1.0] tracking-tight block text-text-primary">Differently.</span>
        </div>
        
        <div className="think-right p-0 pl-[14px] lg:p-[80px_64px] flex flex-col justify-center gap-[10px] lg:gap-[24px]">
          <div className="think-item reveal-item flex items-start gap-[8px] lg:gap-[18px] border-b border-white/6 lg:border-none pb-[7px] lg:pb-0">
            <div className="think-icon w-[22px] h-[22px] lg:w-[34px] lg:h-[34px] rounded-full flex items-center justify-center flex-shrink-0 mt-0 lg:mt-[2px] border-[1.5px] border-white/30 text-white/50">
              <X className="w-[10px] h-[10px] lg:w-[14px] lg:h-[14px]" />
            </div>
            <p className="text-[9.4px] lg:text-[18px] leading-[1.35] lg:leading-[1.55] pt-0 lg:pt-[6px] text-white/72">
              We don&apos;t believe one fragrance is right for everyone.
            </p>
          </div>

          <div className="think-item reveal-item d1 flex items-start gap-[8px] lg:gap-[18px] border-b border-white/6 lg:border-none pb-[7px] lg:pb-0">
            <div className="think-icon w-[22px] h-[22px] lg:w-[34px] lg:h-[34px] rounded-full flex items-center justify-center flex-shrink-0 mt-0 lg:mt-[2px] border-[1.5px] border-white/30 text-white/50">
              <X className="w-[10px] h-[10px] lg:w-[14px] lg:h-[14px]" />
            </div>
            <p className="text-[9.4px] lg:text-[18px] leading-[1.35] lg:leading-[1.55] pt-0 lg:pt-[6px] text-white/72">
              We don&apos;t believe popularity determines suitability.
            </p>
          </div>

          <div className="think-item reveal-item d2 flex items-start gap-[8px] lg:gap-[18px] border-b border-white/6 lg:border-none pb-[7px] lg:pb-0">
            <div className="think-icon w-[22px] h-[22px] lg:w-[34px] lg:h-[34px] rounded-full flex items-center justify-center flex-shrink-0 mt-0 lg:mt-[2px] border-[1.5px] border-white/30 text-white/50">
              <X className="w-[10px] h-[10px] lg:w-[14px] lg:h-[14px]" />
            </div>
            <p className="text-[9.4px] lg:text-[18px] leading-[1.35] lg:leading-[1.55] pt-0 lg:pt-[6px] text-white/72">
              We don&apos;t believe reviews can tell you what you&apos;ll love.
            </p>
          </div>

          <div className="think-item reveal-item d3 flex items-start gap-[8px] lg:gap-[18px] border-b border-white/6 lg:border-none pb-[7px] lg:pb-0">
            <div className="think-icon w-[22px] h-[22px] lg:w-[34px] lg:h-[34px] rounded-full flex items-center justify-center flex-shrink-0 mt-0 lg:mt-[2px] border-[1.5px] border-white/30 text-white/50">
              <X className="w-[10px] h-[10px] lg:w-[14px] lg:h-[14px]" />
            </div>
            <p className="text-[9.4px] lg:text-[18px] leading-[1.35] lg:leading-[1.55] pt-0 lg:pt-[6px] text-white/72">
              We don&apos;t believe fragrance discovery should begin with the bottle.
            </p>
          </div>

          <div className="think-item reveal-item d4 flex items-start gap-[8px] lg:gap-[18px] pb-0 pt-[8px] lg:pt-0">
            <div className="think-icon w-[22px] h-[22px] lg:w-[34px] lg:h-[34px] rounded-full flex items-center justify-center flex-shrink-0 mt-0 lg:mt-[2px] border-[1.5px] border-gold bg-gold/14 text-gold">
              <Check className="w-[10px] h-[10px] lg:w-[14px] lg:h-[14px]" />
            </div>
            <p className="text-[14px] lg:text-[18px] heading-serif font-medium text-gold leading-tight pt-0 lg:pt-[6px]">
              We believe it should begin with you.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ WHO YOU ARE ═══════════ */}
      <section className="who-section p-[22px_14px_18px] lg:p-[80px_80px_100px] bg-bg border-t border-white/6 lg:border-none">
        <div className="who-cards grid grid-cols-2 lg:grid-cols-4 border-0 lg:border border-white/8 rounded-0 lg:rounded-[14px] overflow-visible lg:overflow-hidden gap-[12px] lg:gap-0">
          
          {/* Card 1 */}
          <div className="who-card border border-white/8 lg:border-r lg:border-white/8 rounded-[7px] lg:rounded-none p-[22px_14px] lg:p-[40px_32px] bg-gradient-to-br from-[#0d0b08] to-[#090705] lg:from-transparent lg:to-transparent flex flex-col items-center lg:items-start text-center lg:text-left gap-[16px] min-h-[142px] lg:min-h-0 transition-colors duration-300 hover:bg-gold/4">
            <div className="who-card-icon text-gold mb-0 lg:mb-[4px]">
              <User className="w-[29px] h-[29px] lg:w-[28px] lg:h-[28px]" />
            </div>
            <h4 className="heading-serif text-[16px] lg:text-[18px] font-semibold text-text-primary leading-[1.15] lg:leading-[1.2]">
              Who you are.
            </h4>
            <p className="text-[10px] lg:text-[13px] text-white/66 lg:text-text-secondary leading-[1.4] lg:leading-[1.6]">
              Your personality, taste and natural preferences.
            </p>
          </div>

          {/* Card 2 */}
          <div className="who-card border border-white/8 lg:border-r lg:border-white/8 rounded-[7px] lg:rounded-none p-[22px_14px] lg:p-[40px_32px] bg-gradient-to-br from-[#0d0b08] to-[#090705] lg:from-transparent lg:to-transparent flex flex-col items-center lg:items-start text-center lg:text-left gap-[16px] min-h-[142px] lg:min-h-0 transition-colors duration-300 hover:bg-gold/4">
            <div className="who-card-icon text-gold mb-0 lg:mb-[4px]">
              <Calendar className="w-[29px] h-[29px] lg:w-[28px] lg:h-[28px]" />
            </div>
            <h4 className="heading-serif text-[16px] lg:text-[18px] font-semibold text-text-primary leading-[1.15] lg:leading-[1.2]">
              How you live.
            </h4>
            <p className="text-[10px] lg:text-[13px] text-white/66 lg:text-text-secondary leading-[1.4] lg:leading-[1.6]">
              Your routines, occasions and environment.
            </p>
          </div>

          {/* Card 3 */}
          <div className="who-card border border-white/8 lg:border-r lg:border-white/8 rounded-[7px] lg:rounded-none p-[22px_14px] lg:p-[40px_32px] bg-gradient-to-br from-[#0d0b08] to-[#090705] lg:from-transparent lg:to-transparent flex flex-col items-center lg:items-start text-center lg:text-left gap-[16px] min-h-[142px] lg:min-h-0 transition-colors duration-300 hover:bg-gold/4">
            <div className="who-card-icon text-gold mb-0 lg:mb-[4px]">
              <Heart className="w-[29px] h-[29px] lg:w-[28px] lg:h-[28px]" />
            </div>
            <h4 className="heading-serif text-[16px] lg:text-[18px] font-semibold text-text-primary leading-[1.15] lg:leading-[1.2]">
              What you value.
            </h4>
            <p className="text-[10px] lg:text-[13px] text-white/66 lg:text-text-secondary leading-[1.4] lg:leading-[1.6]">
              Freshness, depth, subtlety, boldness or comfort.
            </p>
          </div>

          {/* Card 4 */}
          <div className="who-card border border-white/8 rounded-[7px] lg:rounded-none p-[22px_14px] lg:p-[40px_32px] bg-gradient-to-br from-[#0d0b08] to-[#090705] lg:from-transparent lg:to-transparent flex flex-col items-center lg:items-start text-center lg:text-left gap-[16px] min-h-[142px] lg:min-h-0 transition-colors duration-300 hover:bg-gold/4">
            <div className="who-card-icon text-gold mb-0 lg:mb-[4px]">
              <Star className="w-[29px] h-[29px] lg:w-[28px] lg:h-[28px]" />
            </div>
            <h4 className="heading-serif text-[16px] lg:text-[18px] font-semibold text-text-primary leading-[1.15] lg:leading-[1.2]">
              How you want to be remembered.
            </h4>
            <p className="text-[10px] lg:text-[13px] text-white/66 lg:text-text-secondary leading-[1.4] lg:leading-[1.6]">
              The impression you want your fragrance to leave behind.
            </p>
          </div>
        </div>

        {/* It's You Strip */}
        <div className="its-you-strip reveal-item grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr_1px_auto] items-center gap-0 mt-[18px] lg:mt-[40px] border border-white/8 rounded-[8px] lg:rounded-[14px] overflow-hidden bg-gradient-to-br from-[#0c0a08] to-[#070604] p-0 lg:pb-[60px]">
          
          <div className="its-you-cell icon-cell p-[20px_18px] lg:p-[40px_40px_0] flex items-start gap-[14px] lg:gap-[20px]">
            <div className="its-you-icon w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] rounded-full border border-gold/35 flex items-center justify-center flex-shrink-0 text-gold bg-gold/6">
              <Sparkles className="w-[17px] h-[17px] lg:w-[20px] lg:h-[20px]" />
            </div>
            <p className="text-[12.5px] lg:text-[15px] text-white/80 lg:text-white/65 leading-[1.4] lg:leading-[1.65]">
              Because every meaningful recommendation starts with understanding.
            </p>
          </div>
          
          <div className="its-you-divider h-[1px] w-auto lg:h-[80px] lg:w-[1px] mx-[18px] lg:mx-0 bg-white/8 align-self-center mt-0 lg:mt-[40px]" />
          
          <div className="its-you-cell p-[20px_18px] lg:p-[40px_40px_0]">
            <p className="text-[12.5px] lg:text-[15px] text-white/80 lg:text-white/65 leading-[1.4] lg:leading-[1.65]">
              And the first thing worth understanding isn&apos;t the fragrance.
            </p>
          </div>
          
          <div className="its-you-divider h-[1px] w-auto lg:h-[80px] lg:w-[1px] mx-[18px] lg:mx-0 bg-white/8 align-self-center mt-0 lg:mt-[40px]" />
          
          <div className="its-you-word p-[18px_22px_24px] lg:p-[40px_60px_0] heading-serif text-[38px] lg:text-[52px] font-semibold italic text-gold text-right lg:text-left leading-[0.95] lg:leading-[1.2] whitespace-normal lg:whitespace-nowrap">
            It&apos;s you.
          </div>
        </div>
      </section>

      {/* ═══════════ BELIEFS ═══════════ */}
      <section className="beliefs p-[22px_22px] lg:p-[100px_80px] bg-bg border-t border-white/6 lg:border-none">
        <div className="text-left lg:text-center mb-[16px] lg:mb-[56px]">
          <p className="reveal-item eyebrow mb-[9px] lg:mb-[14px]">OUR PRINCIPLES</p>
          <h2 className="reveal-item heading-serif text-[23px] lg:text-[46px] text-text-primary leading-[1.08] lg:leading-[1.12]">
            The <span className="text-gold italic font-medium">Beliefs</span> That Shape Crafted Sprays
          </h2>
        </div>

        {/* Accordion list on mobile, 3-column grid on desktop */}
        <div className="beliefs-grid flex flex-col lg:grid lg:grid-cols-3 border-none lg:border lg:border-gold/22 rounded-none lg:rounded-[16px] overflow-visible lg:overflow-hidden gap-[8px] lg:gap-0">
          {beliefs.map((b, index) => (
            <div
              key={index}
              onClick={() => toggleBelief(index)}
              className={`belief reveal-item relative border-none lg:border-r lg:border-b lg:border-gold/14 p-[11px_40px_11px_48px] lg:p-[40px_36px] bg-gold/8 lg:bg-transparent rounded-[7px] lg:rounded-none min-h-[40px] lg:min-h-0 lg:transition-colors lg:duration-300 lg:hover:bg-gold/4 cursor-pointer lg:cursor-default
                ${index === 2 || index === 5 ? "lg:border-r-0" : ""}
                ${index >= 3 ? "lg:border-b-0" : ""}
              `}
            >
              {/* Accordion toggle indicator on mobile (+ / -) */}
              <span className="lg:hidden absolute right-[16px] top-[50%] translate-y-[-50%] text-[22px] text-gold font-light leading-none">
                {expandedBelief === index ? "−" : "+"}
              </span>

              {/* Belief number indicator */}
              <span className="belief-num absolute left-[16px] top-[13px] lg:static text-[10px] lg:text-[11px] font-bold text-gold tracking-widest mb-0 lg:mb-3 block leading-none lg:leading-normal">
                {b.num}
              </span>

              {/* Icon wrap (desktop only or visible when expanded) */}
              <div className="belief-icon-wrap hidden lg:flex w-[42px] h-[42px] rounded-full border border-gold/30 items-center justify-center mb-[16px] bg-gold/6 text-gold">
                {b.icon}
              </div>

              {/* Title */}
              <h3 className="heading-serif text-[12.5px] lg:text-[19px] font-semibold text-text-primary leading-[1.35] lg:leading-tight mb-0 lg:mb-3">
                {b.title}
              </h3>

              {/* Content description (always visible on desktop, toggleable on mobile) */}
              <div className={`mt-2 lg:mt-0 lg:block ${expandedBelief === index ? "block" : "hidden"}`}>
                <p className="text-[11.5px] lg:text-[13px] text-white/60 lg:text-text-secondary leading-[1.55] lg:leading-[1.7] mb-2">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ VISION ═══════════ */}
      <section className="vision p-[26px_22px_0] lg:p-[110px_80px_0] bg-bg relative overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_80%_50%,rgba(196,130,58,0.1),transparent_65%)] pointer-events-none" />

        <div className="vision-grid block lg:grid lg:grid-cols-2 gap-[80px] items-center relative z-10">
          <div className="vision-copy pb-0 lg:pb-[80px] relative z-10">
            <p className="reveal-item eyebrow mb-[9px] lg:mb-[14px]">OUR VISION</p>
            <h2 className="reveal-item heading-serif text-[24px] lg:text-[46px] text-[#f0e8d8] leading-[1.08] lg:leading-[1.12] mb-[12px] lg:mb-[56px]">
              The <span className="text-gold italic font-medium">Future</span> We&apos;re Building
            </h2>
            <div className="vision-divider reveal-item hidden lg:block w-[44px] h-[2px] bg-gold mb-[28px]" />
            <p className="reveal-item text-[11.5px] lg:text-[15px] text-text-secondary leading-[1.55] lg:leading-[1.85] mb-[7px] lg:mb-[10px] max-w-[300px] lg:max-w-none">
              For decades, the fragrance industry has focused on creating perfumes for the market.
            </p>
            <p className="reveal-item text-[11.5px] lg:text-[15px] text-text-secondary leading-[1.55] lg:leading-[1.85] mb-[7px] lg:mb-[10px] max-w-[300px] lg:max-w-none">
              We&apos;re working towards a future where fragrance begins with the individual.
            </p>
            <p className="reveal-item text-[11.5px] lg:text-[15px] text-text-secondary leading-[1.55] lg:leading-[1.85] mb-[7px] lg:mb-[10px] max-w-[300px] lg:max-w-none">
              Where every recommendation starts with understanding, not assumptions.
            </p>
            <p className="reveal-item text-[11.5px] lg:text-[15px] text-text-secondary leading-[1.55] lg:leading-[1.85] mb-[7px] lg:mb-[10px] max-w-[300px] lg:max-w-none">
              Where personal preference matters more than popularity.
            </p>
            <p className="reveal-item text-[11.5px] lg:text-[15px] text-text-secondary leading-[1.55] lg:leading-[1.85] mb-[7px] lg:mb-[10px] max-w-[300px] lg:max-w-none">
              Where discovery matters more than marketing.
            </p>
            <p className="reveal-item text-[11.5px] lg:text-[15px] text-text-secondary leading-[1.55] lg:leading-[1.85] mb-[7px] lg:mb-[10px] max-w-[300px] lg:max-w-none">
              Where people no longer have to rely on trends, reviews or guesswork to find a fragrance they&apos;ll love.
            </p>
            <p className="reveal-item text-[11.5px] lg:text-[15px] text-text-secondary leading-[1.55] lg:leading-[1.85] mb-[7px] lg:mb-[10px] max-w-[300px] lg:max-w-none">
              A future where finding the right fragrance feels natural, personal and deeply intentional.
            </p>
            <p className="reveal-item gold-line text-[12px] lg:text-[15px] text-gold font-medium italic mt-[8px] max-w-[275px] lg:max-w-none">
              Because we believe that&apos;s how fragrance should have worked all along.
            </p>
          </div>

          <div className="vision-image reveal-item mt-[-10px] lg:mt-[20px] flex items-end justify-end min-h-[175px] lg:min-h-0 relative">
            <Image
              src="/assets/bottle-on-rock.png"
              alt="Crafted Sprays — The Future We're Building"
              width={600}
              height={600}
              sizes="(max-width: 1024px) 250px, 600px"
              className="w-full max-w-[250px] lg:max-w-[600px] mr-[-18px] lg:mr-0 filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="cta-section p-[30px_22px_34px] lg:p-[110px_80px] text-center bg-[radial-gradient(ellipse_600px_300px_at_50%_0%,rgba(196,130,58,0.14),transparent_70%),var(--color-bg)] border-t border-white/8 lg:border-white/6">
        <h2 className="reveal-item heading-serif text-[25px] lg:text-[48px] text-text-primary leading-[1.05] lg:leading-[1.15] mb-[12px] lg:mb-[16px]">
          Ready To Discover<br />What Suits You?
        </h2>
        <p className="reveal-item text-[12px] lg:text-[16px] text-text-secondary max-w-[260px] lg:max-w-[480px] mx-auto leading-[1.55] lg:leading-[1.7] mb-[20px] lg:mb-[36px]">
          Understanding yourself is the first step towards discovering a fragrance that feels uniquely yours.
        </p>
        <div className="cta-btns reveal-item flex flex-col lg:flex-row gap-[14px] justify-center items-center">
          <button
            onClick={openComingSoon}
            className="btn-gold rounded-full lg:rounded-[9px] py-[13px] lg:py-[14px] px-[34px] lg:px-[28px] text-[13px] lg:text-[14.5px] font-semibold justify-center flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
          >
            Start My Discovery
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href="/how-it-works"
            className="btn-outline hidden lg:inline-flex rounded-[9px] py-[14px] px-[24px] text-[14.5px] font-semibold justify-center items-center gap-2"
          >
            How It Works
          </a>
        </div>
      </section>
    </div>
  );
}
