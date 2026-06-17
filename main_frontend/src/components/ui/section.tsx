interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'alt';
  className?: string;
  id?: string;
}

const variantStyles = {
  default: 'bg-cream',
  alt: 'bg-ivory',
} as const;

export function Section({
  children,
  variant = 'default',
  className = '',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-[72px] md:py-[110px] ${variantStyles[variant]} ${className}`}
    >
      {children}
    </section>
  );
}
