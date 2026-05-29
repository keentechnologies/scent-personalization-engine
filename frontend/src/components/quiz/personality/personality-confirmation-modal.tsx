

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">

      <div className="w-full max-w-sm rounded-3xl bg-white p-6">

        <h2 className="text-xl font-semibold">
          Continue without personality selection?
        </h2>

        <p className="mt-3 text-sm leading-6 text-neutral-600">
          You have left all personality sliders at 0.
          Are you sure you want to continue?
        </p>

        <div className="mt-6 flex gap-3">

          <button
            type="button"
            onClick={onCancel}
            className="h-12 flex-1 rounded-2xl border border-neutral-300"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-12 flex-1 rounded-2xl bg-black text-white"
          >
            Continue
          </button>

        </div>

      </div>

    </div>
  );
}