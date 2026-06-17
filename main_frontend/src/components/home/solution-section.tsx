import { Container } from '@/components/ui/container';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

const cards = [
  { icon: '◍', title: 'Who You Are', desc: 'The fragrances we connect with often say something about us before we say a word.' },
  { icon: '⌖', title: 'How You Live', desc: 'A fragrance should fit naturally into your life, not ask you to become someone else to wear it.' },
  { icon: '✍', title: 'How You Want To Be Remembered', desc: 'Every fragrance leaves an impression. The right one leaves the impression you want people to remember.' },
];

export function SolutionSection() {
  return (
    <section className="bg-cream py-16 md:py-20 lg:py-24">
      <Container>
        {/* Two-column intro */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div>
            <ScrollReveal>
              <h2 className="max-w-[18ch]">
                The Difference Between A Good Fragrance And The Right Fragrance Is You.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="mt-8 space-y-2">
                <p className="font-serif text-[clamp(1.375rem,2.8vw,2rem)] leading-[1.2] tracking-[-0.02em] text-obsidian">
                  A good fragrance smells pleasant.
                </p>
                <p className="font-serif text-[clamp(1.375rem,2.8vw,2rem)] leading-[1.2] tracking-[-0.02em] text-obsidian">
                  The right fragrance feels effortless.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <div className="space-y-4 lg:pt-10">
              <p className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                Like it belongs on you. Like you&rsquo;ve worn it for years. Like you&rsquo;ve finally stopped searching.
              </p>
              <p className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                Because the best fragrance isn&rsquo;t the one everyone agrees on. It&rsquo;s the one you instantly connect with.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Cards row */}
        <StaggerContainer className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {cards.map((card) => (
            <StaggerItem key={card.title} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-white p-6 shadow-[var(--shadow-card)] md:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ivory text-base text-sand-dark">
                  {card.icon}
                </div>
                <h3 className="mt-4 text-[16px] font-semibold leading-snug text-obsidian">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-text-muted">
                  {card.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
