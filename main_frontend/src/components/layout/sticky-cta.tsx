import { ComingSoonTrigger } from '@/components/coming-soon/coming-soon-provider';

export function StickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/40 bg-cream/90 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-[16px] md:hidden">
      <ComingSoonTrigger
        className="block w-full rounded-full bg-obsidian py-4 text-center text-[15px] font-medium tracking-wide text-cream"
      >
        Start My Discovery →
      </ComingSoonTrigger>
    </div>
  );
}
