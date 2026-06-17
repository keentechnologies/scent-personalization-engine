

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-cream border border-border p-6 shadow-xl">
        <h2 className="font-serif text-xl font-semibold text-obsidian">
          Continue with zero-rated personalities?
        </h2>

        <p className="mt-3 text-[14px] text-text-muted leading-relaxed">
          You have left one or more personality sliders at 0.
          Are you sure you want to continue?
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-[48px] flex-1 rounded-2xl border-2 border-border bg-white text-[14px] font-semibold text-obsidian transition-all duration-200 active:scale-[0.98] cursor-pointer hover:bg-ivory/50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-[48px] flex-1 rounded-2xl bg-obsidian text-[14px] font-semibold text-cream transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}