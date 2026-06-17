'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const faqData = [
  { q: 'How is Crafted Sprays different from a normal perfume brand?', a: 'Most perfume brands start with a fragrance and then help you choose one. We start with you and build a fragrance profile before identifying what is most likely to suit you.' },
  { q: 'How does the fragrance discovery process work?', a: "You'll answer questions about your personality, preferences, lifestyle, and desired impression. We use those responses to build your fragrance profile and craft a fragrance around it." },
  { q: 'How long does the discovery process take?', a: 'Most people complete the discovery journey in just a few minutes.' },
  { q: 'Do I need to know anything about perfumes?', a: "Not at all. The process is designed for everyone, whether you're new to fragrance or already an enthusiast." },
  { q: 'Will everyone receive the same fragrance recommendation?', a: 'No. Every fragrance profile is built around the individual, which means different people can receive very different fragrance directions.' },
  { q: 'Can I reorder my fragrance later?', a: 'Yes. Once your fragrance profile is created, reordering is simple.' },
  { q: 'What information do you use to create my fragrance?', a: 'We look at factors such as personality, desired impression, fragrance preferences, lifestyle, and any relevant sensitivities or restrictions.' },
  { q: 'What if I have allergies or ingredient sensitivities?', a: "We'll ask about allergies and sensitivities during the discovery process and take them into account wherever possible." },
  { q: 'Is my fragrance completely unique?', a: 'Your fragrance is crafted around your individual profile. While profiles may share similarities, the recommendations and fragrance directions are personalized to the individual.' },
  { q: 'How long does delivery take?', a: 'Delivery timelines depend on your location and current order volumes. Estimated timelines are shown during checkout.' },
  { q: 'Is this suitable as a gift?', a: 'Yes. The discovery experience makes Crafted Sprays a highly personal and thoughtful gift.' },
  { q: 'Do you only create fragrances for men?', a: 'No. Crafted Sprays is designed for anyone looking to discover a fragrance that suits them.' },
  { q: "What if I don't usually wear perfume?", a: 'That\'s perfectly fine. Many customers start their fragrance journey with little or no prior experience.' },
  { q: 'Can my fragrance profile change over time?', a: 'Yes. As people evolve, their preferences and desired impressions can evolve too. You can always revisit the discovery process.' },
  { q: 'Why focus on the person instead of the perfume?', a: "Because the right fragrance isn't determined by what works for most people. It's determined by what works for the individual wearing it." },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section variant="alt">
      <Container>
        <ScrollReveal>
          <h2 className="max-w-[700px]">Frequently Asked Questions</h2>
          <p className="mt-4 text-text-muted text-[15px]">Tap any question to expand.</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 max-w-[800px]">
            {faqData.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-b border-border/60">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className={`w-full flex justify-between items-center py-5 text-left transition-all duration-200 cursor-pointer ${
                      isOpen ? 'border-l-2 border-sand pl-4' : 'border-l-2 border-transparent pl-4'
                    }`}
                  >
                    <span className="font-serif text-[18px] md:text-[20px] font-medium text-obsidian pr-4">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 text-sand"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pl-4 text-text-muted text-[15px] leading-relaxed max-w-[680px]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
