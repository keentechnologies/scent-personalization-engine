import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

const steps = [
  { num: 1, title: 'Answer A Few Questions', desc: "Tell us about who you are, how you want to be perceived, and the fragrances you're naturally drawn to." },
  { num: 2, title: 'Build Your Fragrance Profile', desc: 'Our AI analyzes your responses to uncover patterns, preferences, and characteristics that influence what is most likely to suit you.' },
  { num: 3, title: 'Craft Your Fragrance', desc: 'Your fragrance profile guides the creation of a fragrance designed specifically around you.' },
  { num: 4, title: 'Delivered To Your Door', desc: 'Receive your personalised fragrance, ready to become part of your everyday life.' },
];

export function ProcessSteps() {
  return (
    <Section variant="default">
      <Container>
        <ScrollReveal>
          <h2 className="max-w-[700px]">How Your Fragrance Comes To Life</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-5 text-[clamp(17px,4vw,20px)] leading-relaxed text-text-muted max-w-[720px]">
            Every fragrance begins with understanding the person who&rsquo;ll wear it. From there, we build your fragrance profile, identify what suits you, and craft a fragrance designed specifically around you.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-6 mt-14 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StaggerItem key={step.num}>
              <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-7 border border-border/50 hover:-translate-y-1.5 transition-all duration-300 h-full">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand/20 font-serif text-lg font-semibold text-sand-dark">
                  {step.num}
                </span>
                <h3 className="font-serif text-[20px] font-medium text-obsidian mt-5">{step.title}</h3>
                <p className="text-[15px] text-text-muted mt-2 leading-relaxed">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
