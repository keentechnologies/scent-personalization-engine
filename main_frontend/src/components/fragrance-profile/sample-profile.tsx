import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ProfileCardVisual } from '@/components/visuals/profile-card-visual';

export function SampleProfile() {
  return (
    <Section variant="default" id="sample">
      <Container>
        <ScrollReveal>
          <h2 className="max-w-[700px]">A Fragrance Profile In Action</h2>
          <p className="mt-5 text-[clamp(17px,4vw,20px)] leading-relaxed text-text-muted max-w-[720px]">
            Every profile tells a different story. Here&rsquo;s what one might look like.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-10 items-center mt-14 md:grid-cols-[1fr_0.8fr]">
          <ScrollReveal direction="left">
            <ProfileCardVisual />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="bg-obsidian rounded-[28px] p-8 md:p-10">
              <h3 className="font-serif text-[32px] md:text-[38px] text-cream font-medium leading-[1.1]">
                The Modern Explorer
              </h3>
              <p className="text-cream/70 mt-3 text-[15px] leading-relaxed">
                Confident, curious, and independent. Prefers authenticity over attention and values experiences over appearances.
              </p>

              <div className="border-t border-cream/10 my-6" />

              {/* Desired Impression */}
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-cream/40 mb-3">
                Desired Impression
              </p>
              <div className="flex flex-wrap gap-2">
                {['Confident', 'Approachable', 'Refined', 'Adventurous'].map((tag) => (
                  <span key={tag} className="rounded-full bg-cream/10 border border-cream/15 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-cream/80 inline-block">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Fragrance Direction */}
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-cream/40 mb-3 mt-6">
                Fragrance Direction
              </p>
              <span className="rounded-full bg-sand/20 border border-sand/30 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-sand inline-block">
                Fresh Woody Citrus
              </span>

              {/* Signature Accords */}
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-cream/40 mb-3 mt-6">
                Signature Accords
              </p>
              <div className="flex flex-wrap gap-2">
                {['Bergamot', 'Vetiver', 'Cedarwood', 'Green Notes', 'Soft Musk'].map((tag) => (
                  <span key={tag} className="rounded-full bg-cream/10 border border-cream/15 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-cream/80 inline-block">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Best For */}
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-cream/40 mb-3 mt-6">
                Best For
              </p>
              <div className="flex flex-wrap gap-2">
                {['Work', 'Travel', 'Everyday Wear', 'Casual Evenings'].map((tag) => (
                  <span key={tag} className="rounded-full bg-sand/20 border border-sand/30 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-sand inline-block">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="border-t border-cream/10 my-6" />

              {/* Why It Fits */}
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-cream/40 mb-3">
                Why It Fits
              </p>
              <p className="text-cream/60 text-[15px] leading-relaxed italic">
                This fragrance profile balances freshness and sophistication, creating a fragrance that feels versatile, confident, and naturally wearable.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
