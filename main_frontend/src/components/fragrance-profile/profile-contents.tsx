import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

export function ProfileContents() {
  return (
    <Section variant="alt">
      <Container>
        <ScrollReveal>
          <h2 className="max-w-[700px]">What&rsquo;s Inside Your Fragrance Profile?</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-5 text-[clamp(17px,4vw,20px)] leading-relaxed text-text-muted max-w-[720px]">
            Your profile is designed to uncover what genuinely suits you — not simply what is popular.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-5 mt-14 md:grid-cols-2 lg:grid-cols-3">
          <StaggerItem>
            <Card icon="◍" title="Personality Insights" description="Understand how your personality influences the fragrances you're most likely to connect with." />
          </StaggerItem>
          <StaggerItem>
            <Card icon="✍" title="Desired Impression" description="Discover how you naturally want to be perceived and how fragrance can reinforce that impression." />
          </StaggerItem>
          <StaggerItem>
            <Card icon="⌖" title="Fragrance Direction" description="Identify the fragrance families and scent directions that best align with you." />
          </StaggerItem>
          <StaggerItem>
            <Card icon="▦" title="Signature Accords" description="Explore the accords and scent characteristics that form the foundation of your fragrance." />
          </StaggerItem>
          <StaggerItem>
            <Card icon="◷" title="Occasion Fit" description="Understand which fragrance styles best suit your everyday life and special occasions." />
          </StaggerItem>
          <StaggerItem>
            <Card icon="⚱" title="Personalised Recommendation" description="Receive a fragrance recommendation crafted specifically around your profile." />
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </Section>
  );
}
