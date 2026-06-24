type PersonalityConfirmationModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function PersonalityConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
}: PersonalityConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5 backdrop-blur-md">
      <div className="w-full max-w-sm rounded-[32px] bg-[#1d1a17]/95 border border-border p-6 shadow-[0_24px_50px_rgba(0,0,0,0.6)] overflow-hidden relative">
        {/* Ambient card glow */}
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle,rgba(196,130,58,0.12)_0%,transparent_70%)] pointer-events-none" />

        <h2 className="heading-serif text-xl font-semibold text-[#f3efe8] relative z-10">
          Continue with zero-rated personalities?
        </h2>

        <p className="mt-3 text-[14px] text-text-secondary leading-relaxed relative z-10">
          You have left one or more personality sliders at 0. Are you sure you want to continue?
        </p>

        <div className="mt-6 flex gap-3 relative z-10">
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline h-[48px] flex-1 rounded-2xl text-[14px] font-semibold"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="btn-gold h-[48px] flex-1 rounded-2xl text-[14px] font-semibold"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}