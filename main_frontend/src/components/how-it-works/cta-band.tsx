import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function CtaBand() {
  return (
    <section id="start" className="bg-obsidian relative overflow-hidden">
      <div className="absolute -bottom-[200px] -right-[100px] w-[420px] h-[420px] rounded-full bg-sand/[0.08] blur-[2px]" />
      <div className="absolute -top-[150px] -left-[80px] w-[300px] h-[300px] rounded-full bg-sand/[0.04]" />

      <Container className="py-[72px] md:py-[96px] text-center relative z-10">
        <ScrollReveal>
          <h2 className="font-serif text-[clamp(32px,7vw,52px)] text-cream leading-[1.05] tracking-[-0.03em] max-w-[800px] mx-auto">
            The Right Fragrance Starts With Understanding You.
          </h2>

          <p className="text-cream/70 text-[clamp(17px,4vw,20px)] mt-6 max-w-[600px] mx-auto leading-relaxed">
            Help us understand who you are, how you want to be perceived, and what feels right to you. We&rsquo;ll take care of the fragrance.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Button variant="light" comingSoon>Start My Discovery →</Button>
          </div>

          <p className="text-cream/40 text-[13px] mt-8 tracking-wide">
            A few thoughtful questions. A fragrance crafted around you.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
