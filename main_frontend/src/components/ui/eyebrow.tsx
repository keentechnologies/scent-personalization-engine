interface EyebrowProps {
  icon: string;
  text: string;
}

export function Eyebrow({ icon, text }: EyebrowProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-text-muted">
      <span className="text-sand-dark" aria-hidden="true">
        {icon}
      </span>
      {text}
    </span>
  );
}
