import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

export function WhatWeNeed() {
  return (
    <Section variant="alt">
      <Container>
        <ScrollReveal>
          <h2 className="max-w-[700px]">What We Need To Know About You</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-5 text-[clamp(17px,4vw,20px)] leading-relaxed text-text-muted max-w-[720px]">
            Creating a fragrance that feels right starts with understanding the person who&rsquo;ll wear it. We ask a few thoughtful questions designed to understand your personality, preferences, and requirements before we begin crafting your fragrance.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-5 mt-14 md:grid-cols-2 lg:grid-cols-4">
          <StaggerItem>
            <Card icon="◍" title="Who You Are" description="Your personality, habits, and natural style influence the kinds of fragrances you'll genuinely connect with." />
          </StaggerItem>
          <StaggerItem>
            <Card icon="✦" title="How You Want To Be Perceived" description="Whether confident, approachable, sophisticated, bold, or understated, your desired impression helps guide the fragrance direction." />
          </StaggerItem>
          <StaggerItem>
            <Card icon="◎" title="Who You Actually Are" description="The fragrances we connect with most often reflect who we are, not who we think we should be." />
          </StaggerItem>
          <StaggerItem>
            <Card icon="✓" title="Allergies Or Sensitivities" description="Your comfort matters as much as your fragrance. We take sensitivities and ingredient preferences into account wherever possible." />
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </Section>
  );
}
