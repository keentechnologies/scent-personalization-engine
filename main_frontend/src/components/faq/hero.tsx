'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FaqVisual } from '@/components/visuals/faq-visual';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
};

export function FaqHero() {
  return (
    <section className="bg-cream pt-[50px] pb-[72px] md:pt-[90px] md:pb-[110px]">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <Eyebrow icon="?" text="Questions" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="mt-5">
              Everything You Need Before Starting.
            </motion.h1>

            <motion.div variants={itemVariants} className="mt-6">
              <p className="text-[clamp(17px,4vw,20px)] leading-relaxed text-text-muted max-w-[600px]">
                A clear guide to how Crafted Sprays works, what you get, and what to expect from your fragrance discovery.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" comingSoon>Start My Discovery →</Button>
              <Button variant="secondary" href="#reviews">Read Early Impressions</Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="rounded-[28px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaqVisual />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
