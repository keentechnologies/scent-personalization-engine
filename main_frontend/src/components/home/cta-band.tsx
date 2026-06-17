import { Container } from '@/components/ui/container';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Link from 'next/link';
import { ComingSoonTrigger } from '@/components/coming-soon/coming-soon-provider';

export function CtaBand() {
  return (
    <section className="bg-cream py-16 md:py-20 lg:py-24">
      <Container>
        <ScrollReveal direction="none">
          <div className="relative overflow-hidden rounded-[2rem] bg-obsidian px-6 py-14 text-center md:rounded-[2.5rem] md:px-12 md:py-20 lg:px-16">
            {/* Decorative arc */}
            <div
              className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-white/[0.04] md:h-80 md:w-80"
              aria-hidden="true"
            />

            <h2 className="relative mx-auto max-w-[22ch] font-serif text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] tracking-[-0.03em] !text-cream">
              If The Right Fragrance Is About You, That&rsquo;s Where The Journey Should Begin.
            </h2>

            <p className="relative mx-auto mt-5 max-w-[40ch] text-[clamp(1rem,2vw,1.1875rem)] leading-relaxed text-cream/65">
              Help us understand you. We&rsquo;ll take care of the fragrance.
            </p>

            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <ComingSoonTrigger
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-cream px-8 text-[15px] font-medium text-obsidian transition-colors hover:bg-sand-light sm:w-auto"
              >
                Start My Discovery →
              </ComingSoonTrigger>
              <Link
                href="/how-it-works"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-cream/30 px-8 text-[15px] font-medium text-cream transition-colors hover:border-cream/50 hover:bg-white/5 sm:w-auto"
              >
                See How It Works
              </Link>
            </div>

            <p className="relative mt-7 text-[13px] text-cream/40">
              A few questions about you. A fragrance crafted around you.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
