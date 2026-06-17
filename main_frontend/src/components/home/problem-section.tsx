import { Container } from '@/components/ui/container';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

const cards = [
  { icon: '📣', title: 'Chasing The Next Recommendation', desc: 'A friend recommends one fragrance. A creator recommends another. A review suggests something completely different.' },
  { icon: '👥', title: 'Choosing What Works For Others', desc: "A fragrance can be perfect for someone else and completely wrong for you. Yet most decisions start with someone else's experience." },
  { icon: '?', title: 'Hoping You Got It Right', desc: 'After all the research, comparisons and reviews, the final decision still comes down to a guess.' },
];

export function ProblemSection() {
  return (
    <section className="bg-ivory py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Left — heading + copy */}
          <div>
            <ScrollReveal>
              <h2 className="max-w-[16ch]">Most Fragrance Decisions Start With Everyone Else.</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="mt-6 space-y-4">
                <p className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                  We&rsquo;re taught to choose fragrances the same way we choose restaurants, movies, or gadgets.
                </p>
                <p className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                  The more people recommend it, the better it must be. The more reviews it has, the safer the choice. The more popular it is, the more likely we&rsquo;ll buy it.
                </p>
                <p className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                  But fragrance isn&rsquo;t a product you simply use. It&rsquo;s a reflection of how you show up in the world.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — cards */}
          <StaggerContainer className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {cards.map((card) => (
              <StaggerItem key={card.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-white p-5 shadow-[var(--shadow-card)] md:p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ivory text-base">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold leading-snug text-obsidian">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-muted">
                    {card.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
