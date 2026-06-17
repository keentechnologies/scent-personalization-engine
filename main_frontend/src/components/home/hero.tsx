'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import Link from 'next/link';
import { ComingSoonTrigger } from '@/components/coming-soon/coming-soon-provider';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

const badges = [
  { icon: '⌖', label: 'Starts With You' },
  { icon: '◎', label: 'Beyond Guesswork' },
  { icon: '✦', label: 'Crafted To Fit' },
  { icon: '✓', label: 'Wear With Confidence' },
];

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF8F5]">
      {/* Desktop background image */}
      <div className="absolute inset-0 hidden lg:block bg-[url('/hero-desktop.png')] bg-cover bg-center z-0" />

      {/* Mobile background image & gradient overlay */}
      <div className="absolute inset-x-0 top-0 block lg:hidden bg-[url('/hero-mobile.png')] bg-cover bg-bottom bg-no-repeat z-0 h-[1550px]" />
      <div
        className="absolute inset-x-0 top-0 block lg:hidden z-10 h-[720px] max-h-[85dvh]"
        style={{
          background: 'linear-gradient(to bottom, #FAF8F5 0%, #FAF8F5 45%, rgba(250, 248, 245, 0.85) 65%, rgba(250, 248, 245, 0) 90%)'
        }}
      />

      <Container className="relative z-20 pt-8 pb-12 lg:pt-20 lg:pb-16 xl:pt-24 xl:pb-20">
        {/* Left — copy */}
        <div className="lg:max-w-[50%] xl:max-w-[48%] min-h-[480px] lg:min-h-0 flex flex-col justify-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 lg:space-y-8">
            <motion.div variants={itemVariants}>
              <Eyebrow icon="◌" text="A New Way To Discover Fragrance" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="max-w-[14ch]">
              The Best Perfume Isn&rsquo;t The Most Popular One.
            </motion.h1>

            <motion.div variants={itemVariants} className="max-w-[52ch] space-y-4">
              <p className="text-[clamp(1.0625rem,2.2vw,1.25rem)] font-medium leading-relaxed text-obsidian">
                It&rsquo;s the one that&rsquo;s uniquely yours.
              </p>
              <p className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                The fragrance industry has spent decades telling people what to wear. We believe choosing a fragrance should start with understanding yourself — not following everyone else.
              </p>
              <p className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                Where finding what suits you matters more than wearing what everyone else is wearing.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-2">
              <ComingSoonTrigger
                className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-obsidian px-7 text-[15px] font-medium text-cream transition-colors hover:bg-charcoal w-full sm:w-auto"
              >
                Start My Discovery →
              </ComingSoonTrigger>
              <Link
                href="/how-it-works"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-obsidian/15 bg-white px-7 text-[15px] font-medium text-obsidian transition-colors hover:bg-ivory w-full sm:w-auto"
              >
                ▷ How It Works
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className='lg:hidden'>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-[48vw] sm:mt-[35vw] lg:mt-24 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
        >
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 shadow-[var(--shadow-sm)] md:hover:shadow-[var(--shadow-md)] transition-shadow duration-300"
            >
              <span className="text-lg text-sand-dark">{badge.icon}</span>
              <span className="text-[14px] font-medium text-obsidian">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
