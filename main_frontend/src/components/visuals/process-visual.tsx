export function ProcessVisual() {
  return (
    <div className="w-full aspect-[1000/420]">
      <svg viewBox="0 0 1000 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background */}
        <rect x="15" y="15" width="970" height="390" rx="24" fill="#F5F0EB" />

        {/* Connecting dashed lines */}
        <line x1="245" y1="200" x2="315" y2="200" stroke="#D6C7B2" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="475" y1="200" x2="545" y2="200" stroke="#D6C7B2" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="705" y1="200" x2="775" y2="200" stroke="#D6C7B2" strokeWidth="2" strokeDasharray="6 4" />

        {/* Card 1 — Questions */}
        <rect x="85" y="110" width="160" height="180" rx="16" fill="white" filter="url(#procShadow)" />
        <circle cx="165" cy="178" r="28" fill="url(#procSandGrad)" />
        <circle cx="165" cy="170" r="10" fill="white" opacity="0.9" />
        <path d="M152 194 Q165 206 178 194" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
        <text x="165" y="246" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#3D3D3D" letterSpacing="0.02em">Questions</text>

        {/* Card 2 — Profile */}
        <rect x="315" y="110" width="160" height="180" rx="16" fill="#0A0A0A" filter="url(#procShadow)" />
        <rect x="355" y="158" width="80" height="6" rx="3" fill="#D6C7B2" />
        <rect x="355" y="174" width="60" height="4" rx="2" fill="#FAF8F5" opacity="0.5" />
        <rect x="355" y="188" width="70" height="4" rx="2" fill="#FAF8F5" opacity="0.3" />
        <rect x="355" y="202" width="50" height="4" rx="2" fill="#FAF8F5" opacity="0.2" />
        <text x="395" y="246" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#D6C7B2" letterSpacing="0.02em">Profile</text>

        {/* Card 3 — Craft */}
        <rect x="545" y="110" width="160" height="180" rx="16" fill="white" filter="url(#procShadow)" />
        <circle cx="625" cy="180" r="28" stroke="#D6C7B2" strokeWidth="2" fill="none" />
        <circle cx="625" cy="180" r="16" stroke="#D6C7B2" strokeWidth="1.5" fill="none" opacity="0.6" />
        <circle cx="625" cy="180" r="6" fill="#D6C7B2" />
        <text x="625" y="246" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#3D3D3D" letterSpacing="0.02em">Craft</text>

        {/* Card 4 — Delivery */}
        <rect x="775" y="110" width="160" height="180" rx="16" fill="white" filter="url(#procShadow)" />
        <rect x="800" y="160" width="50" height="42" rx="4" fill="#D6C7B2" opacity="0.8" />
        <rect x="808" y="155" width="34" height="8" rx="2" fill="#D6C7B2" />
        <line x1="825" y1="172" x2="825" y2="192" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="815" y1="182" x2="835" y2="182" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <text x="855" y="246" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#3D3D3D" letterSpacing="0.02em">Delivery</text>

        {/* Step numbers */}
        <circle cx="115" cy="340" r="14" fill="#D6C7B2" opacity="0.2" />
        <text x="115" y="345" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontWeight="600" fill="#C4A87C">1</text>
        <circle cx="345" cy="340" r="14" fill="#D6C7B2" opacity="0.2" />
        <text x="345" y="345" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontWeight="600" fill="#C4A87C">2</text>
        <circle cx="575" cy="340" r="14" fill="#D6C7B2" opacity="0.2" />
        <text x="575" y="345" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontWeight="600" fill="#C4A87C">3</text>
        <circle cx="805" cy="340" r="14" fill="#D6C7B2" opacity="0.2" />
        <text x="805" y="345" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontWeight="600" fill="#C4A87C">4</text>

        <defs>
          <filter id="procShadow" x="-8" y="-4" width="116%" height="116%">
            <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#0A0A0A" floodOpacity="0.05" />
          </filter>
          <linearGradient id="procSandGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D6C7B2" />
            <stop offset="100%" stopColor="#C4A87C" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
