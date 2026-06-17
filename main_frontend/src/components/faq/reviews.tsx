import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

const reviews = [
  { name: 'Poorna Chandra Tejasvi S', avatar: 'P', quote: 'For the first time, I felt like I understood why I liked certain fragrances and disliked others. The profile was surprisingly accurate.' },
  { name: 'Hemanth Somanna', avatar: 'H', quote: "I've bought fragrances based on recommendations for years. This was the first time the recommendation felt like it was actually based on me." },
  { name: 'Criss Mendonca', avatar: 'C', quote: 'The fragrance profile was my favorite part. It felt less like a quiz and more like someone helping me understand my preferences.' },
  { name: 'Ojasvi Gudi', avatar: 'O', quote: 'I was skeptical at first, but the fragrance direction matched my taste almost perfectly. The whole experience felt very personal.' },
  { name: 'Kushal S Raj', avatar: 'K', quote: "What stood out wasn't the fragrance itself—it was how much thought went into understanding me before recommending anything." },
  { name: 'N Karthikh Karanth', avatar: 'N', quote: "What I liked most was that it didn't ask me to know anything about fragrance. I just answered questions about myself." },
];

export function Reviews() {
  return (
    <Section variant="default" id="reviews">
      <Container>
        <ScrollReveal>
          <h2 className="max-w-[700px]">Early Impressions</h2>
          <p className="mt-5 text-[clamp(17px,4vw,20px)] leading-relaxed text-text-muted max-w-[720px]">
            Feedback from early testers who experienced the Crafted Sprays discovery process.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-5 mt-14 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <StaggerItem key={review.name}>
              <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-7 border border-border/50 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col">
                {/* Stars */}
                <div className="text-[14px] text-obsidian tracking-[2px]">★★★★★</div>

                {/* Quote */}
                <p className="font-serif text-[17px] text-obsidian leading-relaxed mt-4 italic flex-1">
                  &ldquo;{review.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border/40">
                  <span className="w-9 h-9 rounded-full bg-sand/30 flex items-center justify-center text-[14px] font-semibold text-sand-dark shrink-0">
                    {review.avatar}
                  </span>
                  <span className="text-[14px] font-medium text-obsidian">{review.name}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
