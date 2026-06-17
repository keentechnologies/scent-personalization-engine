import type { Metadata } from 'next';
import { HowItWorksHero } from '@/components/how-it-works/hero';
import { WhatWeNeed } from '@/components/how-it-works/what-we-need';
import { ProcessSteps } from '@/components/how-it-works/process-steps';
import { CtaBand } from '@/components/how-it-works/cta-band';

export const metadata: Metadata = {
  title: 'How Crafted Sprays Works',
  description: 'Before we craft a fragrance, we get to know the person wearing it.',
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <WhatWeNeed />
      <ProcessSteps />
      <CtaBand />
    </>
  );
}
