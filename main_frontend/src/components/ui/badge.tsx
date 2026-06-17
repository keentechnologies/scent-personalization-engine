interface BadgeProps {
  icon: string;
  label: string;
}

export function Badge({ icon, label }: BadgeProps) {
  return (
    <span className="bg-ivory border border-border rounded-full px-5 py-2.5 text-[13px] font-medium tracking-wide text-text-primary inline-flex items-center gap-2 transition-transform duration-[220ms] hover:-translate-y-[1px]">
      <span className="text-sand text-base" aria-hidden="true">
        {icon}
      </span>
      {label}
    </span>
  );
}
