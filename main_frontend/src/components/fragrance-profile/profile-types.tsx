import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

const profiles = [
  { title: 'The Quiet Sophisticate', desc: 'Soft woods, clean musks, understated elegance.' },
  { title: 'The Bold Creator', desc: 'Warm spices, expressive notes, memorable presence.' },
  { title: 'The Modern Explorer', desc: 'Fresh citrus, vetiver, cedarwood, versatile confidence.' },
];

export function ProfileTypes() {
  return (
    <Section variant="alt">
      <Container>
        <ScrollReveal>
          <h2 className="max-w-[700px]">No Two Profiles Are Exactly The Same.</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-5 text-[clamp(17px,4vw,20px)] leading-relaxed text-text-muted max-w-[720px]">
            Every fragrance profile is built from a unique combination of personality traits, preferences, lifestyle factors, desired impressions, and scent affinities.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-5 mt-14 md:grid-cols-3">
          {profiles.map((profile) => (
            <StaggerItem key={profile.title}>
              <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-8 border border-border/50 hover:-translate-y-1.5 transition-all duration-300 h-full">
                <h3 className="font-serif text-[24px] font-medium text-obsidian">{profile.title}</h3>
                <p className="text-text-muted text-[15px] mt-3 leading-relaxed">{profile.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
