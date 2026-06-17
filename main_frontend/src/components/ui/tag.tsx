interface TagProps {
  label: string;
  variant?: 'default' | 'sand' | 'dark';
}

const variantStyles = {
  default: 'bg-ivory text-text-primary border border-border/50',
  sand: 'bg-sand/20 text-obsidian border border-sand/30',
  dark: 'bg-graphite text-cream border border-graphite',
} as const;

export function Tag({ label, variant = 'default' }: TagProps) {
  return (
    <span
      className={`rounded-full px-4 py-1.5 text-[13px] font-medium tracking-wide inline-block ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
