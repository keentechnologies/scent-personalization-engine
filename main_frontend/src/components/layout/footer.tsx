import Link from 'next/link';
import { ComingSoonTrigger } from '@/components/coming-soon/coming-soon-provider';

const exploreLinks = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Fragrance Profile', href: '/fragrance-profile' },
  { label: 'FAQ', href: '/faq' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-obsidian text-cream">
      <div className="mx-auto px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal">
                <span className="font-serif text-sm font-semibold text-sand">C</span>
              </span>
              <span className="font-serif text-xl font-semibold text-cream">
                Crafted Sprays
              </span>
            </Link>
            <p className="mt-3 max-w-[280px] text-[15px] text-cream/60">
              A fragrance crafted around the individual.
            </p>
          </div>

          {/* Explore column */}
          <div>
            <h4 className="mb-5 font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-cream/40">
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] text-cream/70 transition-colors hover:text-sand"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Start column */}
          <div>
            <h4 className="mb-5 font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-cream/40">
              Start
            </h4>
            <div className="flex flex-col gap-3">
              <ComingSoonTrigger
                className="text-left text-[15px] text-cream/70 transition-colors hover:text-sand"
              >
                Start My Discovery
              </ComingSoonTrigger>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-cream/10 pt-6">
          <p className="text-[13px] text-cream/40">
            © {currentYear} Crafted Sprays
          </p>
        </div>
      </div>
    </footer>
  );
}
