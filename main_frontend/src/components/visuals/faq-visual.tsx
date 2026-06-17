export function FaqVisual() {
  return (
    <div className="w-full aspect-[900/520]">
      <svg viewBox="0 0 900 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Dark background */}
        <rect x="20" y="20" width="860" height="480" rx="28" fill="#0A0A0A" />

        {/* Decorative circles */}
        <circle cx="750" cy="100" r="80" fill="#D6C7B2" opacity="0.06" />
        <circle cx="150" cy="420" r="60" fill="#D6C7B2" opacity="0.04" />
        <circle cx="820" cy="400" r="40" fill="#D6C7B2" opacity="0.05" />

        {/* Title */}
        <text x="100" y="120" fontFamily="Georgia, serif" fontSize="48" fontWeight="600" fill="#FAF8F5">Questions?</text>
        <text x="100" y="155" fontFamily="Inter, sans-serif" fontSize="15" fill="#D6C7B2" letterSpacing="0.02em">
          Everything you need before starting your discovery.
        </text>

        {/* FAQ Row 1 */}
        <rect x="80" y="200" width="740" height="56" rx="12" fill="white" opacity="0.95" />
        <text x="110" y="234" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="500" fill="#0A0A0A">
          How is this different from a normal perfume brand?
        </text>
        <text x="790" y="236" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fill="#8A8A8A">+</text>

        {/* FAQ Row 2 */}
        <rect x="80" y="272" width="740" height="56" rx="12" fill="white" opacity="0.86" />
        <text x="110" y="306" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="500" fill="#0A0A0A">
          Do I need to know anything about perfumes?
        </text>
        <text x="790" y="308" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fill="#8A8A8A">+</text>

        {/* FAQ Row 3 */}
        <rect x="80" y="344" width="740" height="56" rx="12" fill="white" opacity="0.78" />
        <text x="110" y="378" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="500" fill="#0A0A0A">
          Can I reorder my fragrance later?
        </text>
        <text x="790" y="380" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fill="#8A8A8A">+</text>
      </svg>
    </div>
  );
}
