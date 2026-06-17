'use client';

interface ComingSoonPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComingSoonPopup({
  isOpen,
  onClose,
}: ComingSoonPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-[#F8F3EA] p-8 shadow-2xl sm:p-10">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-lg transition hover:bg-black/5"
        >
          ✕
        </button>

        <div className="mb-6 flex justify-center">
          <div className="animate-pulse text-6xl">✨</div>
        </div>

        <div className="mb-4 text-center">
          <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-black/70">
            Coming Soon
          </span>
        </div>

        <h2 className="text-center text-3xl font-semibold text-black sm:text-4xl">
          You are Early.
        </h2>

        <p className="mx-auto mt-6 max-w-md text-center text-base leading-7 text-black/70 sm:text-lg">
          Our AI-powered fragrance recommendation engine is currently being
          perfected behind the scenes.
        </p>

        <div className="mx-auto mt-8 max-w-md space-y-3 text-left">
          <div className="rounded-2xl bg-white/70 p-4">
            ✦ Personalized scent profiling
          </div>

          <div className="rounded-2xl bg-white/70 p-4">
            ✦ Occasion-based recommendations
          </div>

          <div className="rounded-2xl bg-white/70 p-4">
            ✦ Climate-aware fragrance matching
          </div>

          <div className="rounded-2xl bg-white/70 p-4">
            ✦ Signature scent discovery
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-black/60">
          Thank you for being among the first to explore Crafted Sprays.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition hover:scale-[1.02]"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}