interface CardProps {
  icon: string;
  title: string;
  description: string;
  variant?: 'default' | 'dark';
  className?: string;
}

export function Card({
  icon,
  title,
  description,
  variant = 'default',
  className = '',
}: CardProps) {
  const isDefault = variant === 'default';

  return (
    <div
      className={`rounded-[16px] p-7 h-full transition-all duration-300 hover:-translate-y-1.5 ${
        isDefault
          ? 'bg-white border border-border shadow-sm hover:shadow-lg'
          : 'bg-charcoal text-cream hover:shadow-xl'
      } ${className}`}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${
          isDefault ? 'bg-ivory' : 'bg-graphite text-sand'
        }`}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3
        className={`font-serif text-[22px] font-medium mt-4 leading-snug ${
          isDefault ? 'text-obsidian' : 'text-cream'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-[15px] mt-2 leading-relaxed ${
          isDefault ? 'text-text-muted' : 'text-sand-light/80'
        }`}
      >
        {description}
      </p>
    </div>
  );
}
