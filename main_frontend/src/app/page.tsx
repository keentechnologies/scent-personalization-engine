import { Hero } from '@/components/home/hero';
import { ProblemSection } from '@/components/home/problem-section';
import { SolutionSection } from '@/components/home/solution-section';
import { Comparison } from '@/components/home/comparison';
import { CtaBand } from '@/components/home/cta-band';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <Comparison />
      <CtaBand />
    </>
  );
}
