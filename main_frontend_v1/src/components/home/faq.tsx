"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Plus, Minus } from "lucide-react";
import { useComingSoon } from "@/components/coming-soon/coming-soon-provider";

interface FaqItem {
  q: string;
  a: string[];
}

const faqs: FaqItem[] = [
  {
    q: "How is this different from buying a normal perfume?",
    a: [
      "Most perfumes are designed for broad groups of people.",
      "Crafted Sprays starts with understanding you.",
      "Your fragrance profile is built around your personality, preferences, lifestyle, and the impression you want to leave, helping us identify fragrances that fit you naturally."
    ]
  },
  {
    q: "Is this really personalised?",
    a: [
      "Yes.",
      "Your discovery considers factors such as your personality, fragrance preferences, lifestyle, and desired impression.",
      "No two fragrance profiles are exactly the same."
    ]
  },
  {
    q: "What if I don't know anything about fragrances?",
    a: [
      "Perfect.",
      "Most of our customers aren't fragrance enthusiasts.",
      "The discovery is designed so you can describe yourself instead of fragrance notes.",
      "You don't need to know what bergamot, vetiver, or cedarwood are.",
      "We do the difficult part."
    ]
  },
  {
    q: "How long does the discovery take?",
    a: [
      "Around 5 minutes.",
      "Most people complete it in a single sitting."
    ]
  },
  {
    q: "How long does the fragrance last?",
    a: [
      "Most fragrances typically last 4-6 hours, with some profiles lasting longer depending on the ingredients used, your skin chemistry, and environmental conditions.",
      "Performance is one factor we consider when crafting recommendations, but suitability always comes first."
    ]
  },
  {
    q: "Will the fragrance project strongly?",
    a: [
      "Most fragrances are designed to create a noticeable scent bubble around you without overwhelming the people around you.",
      "The goal is for people near you to notice the fragrance, not for it to announce your arrival from across the room."
    ]
  },
  {
    q: "What if I don't like the recommendation?",
    a: [
      "Fragrance is personal.",
      "That's exactly why our discovery focuses on understanding the person before making recommendations.",
      "Our goal isn't to recommend the most popular fragrance.",
      "It's to recommend what suits you best."
    ]
  },
  {
    q: "Can I order the same fragrance again later?",
    a: [
      "Yes.",
      "Your fragrance profile is saved, making it easy to reorder the same fragrance in the future without repeating the discovery process."
    ]
  },
  {
    q: "How long does delivery take?",
    a: [
      "Most orders are delivered within 4 days of being placed.",
      "You'll receive tracking details once your fragrance has been dispatched."
    ]
  },
  {
    q: "Why shouldn't I just buy a popular perfume?",
    a: [
      "Popular doesn't mean right.",
      "A fragrance that works brilliantly for one person can feel completely wrong on another.",
      "Crafted Sprays focuses on finding what suits you, not what's trending."
    ]
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openComingSoon } = useComingSoon();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-[60px] lg:py-[90px] bg-bg-alt">
      {/* Desktop Layout */}
      <div className="container hidden lg:grid grid-cols-[0.8fr_1.2fr] gap-[56px]">
        {/* Left column info & Testimonials */}
        <div>
          <p className="eyebrow mb-[18px]">Questions People Usually Ask</p>
          <h2 className="heading-serif faq-h2 text-[36px] mb-[18px]">
            Still <span className="text-gold">Unsure?</span>
          </h2>
          <p className="text-text-secondary faq-intro text-[14.5px] leading-[1.7] mb-[40px]">
            Most people have never bought a fragrance this way before. These are the questions we hear most often.
          </p>

          <p className="eyebrow mb-[18px]">What Our Customers Say</p>

          <div className="card testi-card p-[18px] mb-[14px] bg-card border border-border rounded-[16px]">
            <div className="stars text-gold text-[13px] mb-[10px]">★★★★★</div>
            <p className="testi-quote text-[13.5px] leading-[1.6] mb-[12px] text-text-primary">
              &ldquo;This was the first fragrance recommendation that actually felt like me.&rdquo;
            </p>
            <p className="testi-name text-text-secondary text-[12px]">Rishabh S. &middot; Bengaluru</p>
          </div>

          <div className="card testi-card p-[18px] mb-[14px] bg-card border border-border rounded-[16px]">
            <div className="stars text-gold text-[13px] mb-[10px]">★★★★★</div>
            <p className="testi-quote text-[13.5px] leading-[1.6] mb-[12px] text-text-primary">
              &ldquo;I knew absolutely nothing about perfumes and still ended up with something I loved.&rdquo;
            </p>
            <p className="testi-name text-text-secondary text-[12px]">Aman M. &middot; Mumbai</p>
          </div>

          <div className="card testi-card p-[18px] mb-[14px] bg-card border border-border rounded-[16px]">
            <div className="stars text-gold text-[13px] mb-[10px]">★★★★★</div>
            <p className="testi-quote text-[13.5px] leading-[1.6] mb-[12px] text-text-primary">
              &ldquo;I stopped buying fragrance based on YouTube recommendations after this.&rdquo;
            </p>
            <p className="testi-name text-text-secondary text-[12px]">Varun T. &middot; Delhi</p>
          </div>

          <p className="text-text-secondary trust-line text-[12px] mt-[18px]">
            Trusted by thousands of customers across India
          </p>
        </div>

        {/* Right column Accordions */}
        <div id="faq-list" className="flex flex-col">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="faq-item border-b border-border">
                <button
                  className="faq-q w-full flex items-start justify-between gap-[18px] py-[20px] text-left cursor-pointer"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="faq-q-left flex gap-[16px]">
                    <span className="text-gold heading-serif faq-num text-[16px] w-[28px] flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`faq-q-text text-[15.5px] font-medium transition-colors ${isOpen ? "text-gold" : "text-text-primary"}`}>
                      {faq.q}
                    </span>
                  </span>
                  <span className="faq-toggle w-[26px] h-[26px] rounded-full border border-border flex items-center justify-center flex-shrink-0 text-[12px] text-gold">
                    {isOpen ? <Minus className="w-[12px] h-[12px]" /> : <Plus className="w-[12px] h-[12px]" />}
                  </span>
                </button>
                <div
                  className={`faq-a pl-[44px] pb-[22px] flex-col gap-[8px] transition-all duration-300 ${
                    isOpen ? "flex opacity-100" : "hidden opacity-0"
                  }`}
                >
                  {faq.a.map((line, idx) => (
                    <p key={idx} className="text-text-secondary text-[14px] leading-[1.7]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Bottom CTA Banner */}
      <div className="container faq-cta mt-[64px] hidden lg:block">
        <div className="card mini-cta-card relative grid grid-cols-[1fr_auto] items-center gap-[32px] p-[36px_44px] min-h-[200px] overflow-hidden rounded-[16px] bg-bg-alt">
          <div className="absolute inset-0 bg-[url('/assets/mini-cta-bg.png')] bg-right bg-cover bg-no-repeat z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151311]/92 via-[#151311]/72 to-transparent z-1" />
          
          <div className="relative z-10">
            <p className="heading-serif text-[24px] mb-[10px] text-text-primary">
              The Right Fragrance Starts With Understanding You
            </p>
            <p className="text-text-secondary sub text-[14px] mb-[20px]">
              Help us understand who you are. We&apos;ll take care of the fragrance.
            </p>
            <button onClick={openComingSoon} className="btn-gold">
              Start My Discovery
              <ArrowRight className="icon w-[19px] h-[19px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="container block lg:hidden">
        <div className="mobile-faq-extra">
          {/* Header */}
          <div className="mfaq-head text-center mb-[26px]">
            <p className="eyebrow justify-center mb-[10px]">FAQ</p>
            <h2 className="heading-serif text-[26px] leading-[1.2] m-0">
              Still <span className="text-gold">Unsure?</span>
            </h2>
            <p className="text-text-secondary text-[13px] leading-[1.55] mt-[12px]">
              These are the questions we hear most often from our customers.
            </p>
          </div>

          {/* Accordion List with Mobile styles (cards) */}
          <div className="mfaq-list flex flex-col gap-[12px] mb-[20px]">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`faq-item border rounded-[14px] px-[16px] bg-card transition-colors ${
                    isOpen ? "border-gold" : "border-border"
                  }`}
                >
                  <button
                    className="faq-q w-full flex items-center justify-between gap-[10px] py-[16px] text-left cursor-pointer"
                    onClick={() => toggleFaq(i)}
                  >
                    <span className="faq-q-left flex-1 min-w-0">
                      <span className={`faq-q-text text-[14.5px] font-medium leading-[1.4] transition-colors ${isOpen ? "text-gold" : "text-text-primary"}`}>
                        {faq.q}
                      </span>
                    </span>
                    <span className="faq-toggle text-[18px] text-gold flex-shrink-0">
                      {isOpen ? <Minus className="w-[14px] h-[14px]" /> : <Plus className="w-[14px] h-[14px]" />}
                    </span>
                  </button>
                  <div
                    className={`faq-a pb-[16px] flex-col gap-[8px] transition-all duration-300 ${
                      isOpen ? "flex opacity-100" : "hidden opacity-0"
                    }`}
                  >
                    {faq.a.map((line, idx) => (
                      <p key={idx} className="text-text-secondary text-[13px] leading-[1.6]">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile WhatsApp Help card */}
          <div className="mfaq-help flex items-start gap-[14px] p-[18px] border border-border rounded-[16px] bg-card">
            <div className="mfaq-help-icon w-[48px] h-[48px] rounded-full border border-gold flex items-center justify-center flex-shrink-0 text-gold bg-bg">
              <MessageSquare className="w-[20px] h-[20px]" />
            </div>
            <div>
              <h3 className="mfaq-help-title text-[15px] font-semibold text-text-primary mb-[2px]">Need Help Choosing?</h3>
              <p className="text-text-secondary text-[12px] leading-[1.45]">
                Speak to our fragrance experts directly on WhatsApp.
              </p>
              <Link href="#" className="mfaq-chat-link inline-flex items-center gap-[6px] text-[13px] text-gold underline mt-[6px]">
                <MessageSquare className="w-[13px] h-[13px]" />
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
