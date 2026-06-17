import type { Metadata } from 'next';
import { FaqHero } from '@/components/faq/hero';
import { FaqAccordion } from '@/components/faq/faq-accordion';
import { Reviews } from '@/components/faq/reviews';
import { CtaBand } from '@/components/faq/cta-band';

export const metadata: Metadata = {
  title: 'FAQs & Early Impressions | Crafted Sprays',
  description: 'Frequently asked questions about Crafted Sprays fragrance discovery.',
};

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqAccordion />
      <Reviews />
      <CtaBand />
    </>
  );
}
