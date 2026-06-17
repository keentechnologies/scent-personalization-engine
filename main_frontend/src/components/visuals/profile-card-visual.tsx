export function ProfileCardVisual() {
  return (
    <div className="w-full aspect-[900/680]">
      <svg viewBox="0 0 900 680" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background */}
        <rect x="20" y="20" width="860" height="640" rx="28" fill="#F5F0EB" />

        {/* Left — Profile Card */}
        <rect x="60" y="80" width="480" height="520" rx="24" fill="white" filter="url(#profShadow)" />

        {/* Profile card content */}
        <text x="100" y="148" fontFamily="Georgia, serif" fontSize="38" fontWeight="600" fill="#0A0A0A">The Modern</text>
        <text x="100" y="192" fontFamily="Georgia, serif" fontSize="38" fontWeight="600" fill="#0A0A0A">Explorer</text>
        <text x="100" y="224" fontFamily="Inter, sans-serif" fontSize="14" fill="#8A8A8A" letterSpacing="0.02em">Confident · Curious · Independent</text>

        {/* Fragrance Direction */}
        <text x="100" y="272" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#8A8A8A" letterSpacing="0.12em">FRAGRANCE DIRECTION</text>
        <rect x="100" y="284" width="140" height="30" rx="15" fill="#0A0A0A" />
        <text x="170" y="304" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="500" fill="#FAF8F5">Fresh Woody Citrus</text>

        {/* Signature Accords */}
        <text x="100" y="344" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#8A8A8A" letterSpacing="0.12em">SIGNATURE ACCORDS</text>
        <rect x="100" y="358" width="78" height="28" rx="14" fill="#F5F0EB" />
        <text x="139" y="376" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#3D3D3D">Bergamot</text>
        <rect x="186" y="358" width="64" height="28" rx="14" fill="#F5F0EB" />
        <text x="218" y="376" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#3D3D3D">Vetiver</text>
        <rect x="258" y="358" width="86" height="28" rx="14" fill="#F5F0EB" />
        <text x="301" y="376" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#3D3D3D">Cedarwood</text>
        <rect x="352" y="358" width="56" height="28" rx="14" fill="#F5F0EB" />
        <text x="380" y="376" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#3D3D3D">Musk</text>

        {/* Best For */}
        <text x="100" y="420" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#8A8A8A" letterSpacing="0.12em">BEST FOR</text>
        <rect x="100" y="434" width="56" height="28" rx="14" fill="#D6C7B2" opacity="0.2" />
        <text x="128" y="452" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#C4A87C">Work</text>
        <rect x="164" y="434" width="60" height="28" rx="14" fill="#D6C7B2" opacity="0.2" />
        <text x="194" y="452" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#C4A87C">Travel</text>
        <rect x="232" y="434" width="80" height="28" rx="14" fill="#D6C7B2" opacity="0.2" />
        <text x="272" y="452" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#C4A87C">Everyday</text>

        {/* Right — Perfume Bottle */}
        <g transform="translate(640, 160)">
          <rect x="30" y="80" width="120" height="240" rx="10" fill="white" filter="url(#profShadow)" />
          <rect x="50" y="44" width="80" height="42" rx="6" fill="#D6C7B2" />
          <rect x="62" y="78" width="56" height="16" rx="3" fill="#E8DDD0" />
          <rect x="42" y="155" width="96" height="100" rx="6" fill="#0A0A0A" />
          <text x="90" y="198" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="600" fill="#FAF8F5">Crafted</text>
          <text x="90" y="226" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#D6C7B2" letterSpacing="0.3em">SPRAYS</text>
        </g>

        {/* Decorative */}
        <circle cx="780" cy="580" r="60" fill="#D6C7B2" opacity="0.06" />

        <defs>
          <filter id="profShadow" x="-8" y="-4" width="116%" height="116%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#0A0A0A" floodOpacity="0.06" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
