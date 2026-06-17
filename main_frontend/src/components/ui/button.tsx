'use client';

import { type ReactNode } from 'react';
import { useComingSoon } from '@/components/coming-soon/coming-soon-provider';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'light';
  size?: 'default' | 'lg';
  href?: string;
  className?: string;
  comingSoon?: boolean;
}

const baseStyles =
  'rounded-full font-sans font-medium text-[15px] tracking-wide transition-all duration-[220ms] inline-flex items-center justify-center gap-2 cursor-pointer select-none';

const sizeStyles = {
  default: 'min-h-[52px] px-8',
  lg: 'min-h-[56px] px-10 text-base',
} as const;

const variantStyles = {
  primary:
    'bg-obsidian text-cream hover:bg-charcoal hover:-translate-y-[2px] hover:shadow-[var(--shadow-button-hover)]',
  secondary:
    'bg-transparent border border-border text-obsidian hover:bg-ivory hover:-translate-y-[2px] hover:shadow-[var(--shadow-sm)]',
  light:
    'bg-cream text-obsidian hover:-translate-y-[2px] hover:shadow-[var(--shadow-button-hover)]',
} as const;

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  className = '',
  comingSoon = false,
}: ButtonProps) {
  const { openComingSoon } = useComingSoon();
  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (comingSoon) {
    return (
      <button type="button" onClick={openComingSoon} className={classes}>
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
