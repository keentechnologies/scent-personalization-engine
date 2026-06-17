import { Container } from '@/components/ui/container';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

const traditionalItems = [
  { icon: '▥', title: 'Market', desc: 'Designed around the preferences of large groups of people.' },
  { icon: '👥', title: 'Demographic', desc: 'Created for broad customer segments rather than specific individuals.' },
  { icon: '↗', title: 'Trend', desc: 'Influenced by what is currently popular and commercially successful.' },
  { icon: '◎', title: 'Goal', desc: 'Create a fragrance that works well for as many people as possible.' },
];

const craftedItems = [
  { icon: '◍', title: 'You', desc: 'Every fragrance begins with understanding the person who will wear it.' },
  { icon: '♥', title: 'Your Preferences', desc: 'Built around the scent families, notes, and styles you naturally enjoy.' },
  { icon: '⌖', title: 'Your Lifestyle', desc: 'Designed to fit how, where, and when you actually wear fragrance.' },
  { icon: '◆', title: 'Goal', desc: 'Create a fragrance that feels natural, authentic, and suited to you.' },
];

export function Comparison() {
  return (
    <section className="bg-ivory py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <ScrollReveal>
            <div>
              <h2 className="max-w-[20ch]">
                The Best Fragrances Aren&rsquo;t Chosen Off A Shelf. They&rsquo;re Crafted Around You.
              </h2>
              <p className="mt-5 max-w-[38ch] text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                People are different. Why should their fragrances be the same?
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="space-y-4 lg:pt-2">
              <p className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                Most fragrances are created by understanding a market.
              </p>
              <p className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                We create fragrances by understanding a person.
              </p>
              <p className="text-[clamp(0.9375rem,1.8vw,1.0625rem)] leading-[1.8] text-text-muted">
                Because the right fragrance isn&rsquo;t built around what works for most people. It&rsquo;s built around what works for you.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-2">
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col rounded-[1.75rem] border border-border/80 bg-white p-7 shadow-[var(--shadow-card)] md:p-9">
              <h3 className="mb-6 font-serif text-[1.625rem] font-medium text-obsidian md:mb-8">
                Traditional Fragrance Creation
              </h3>
              {traditionalItems.map((item, i) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 py-4 md:py-5 ${i > 0 ? 'border-t border-border/50' : ''}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ivory text-sm">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-obsidian">{item.title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem className="h-full">
            <div className="flex h-full flex-col rounded-[1.75rem] bg-obsidian p-7 md:p-9">
              <h3 className="mb-6 font-serif text-[1.625rem] font-medium text-cream md:mb-8">
                The Crafted Sprays Approach
              </h3>
              {craftedItems.map((item, i) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 py-4 md:py-5 ${i > 0 ? 'border-t border-white/10' : ''}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm text-sand">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-cream">{item.title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-cream/55">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </section>
  );
}
