

type GenderConfirmationModalProps = {
  isOpen: boolean;

  onConfirm: () => void;

  onCancel: () => void;
};

export default function GenderConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
}: GenderConfirmationModalProps) {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">

      <div className="w-full max-w-sm rounded-3xl bg-white p-6">

        <h2 className="text-xl font-semibold">
          Continue with neutral preferences?
        </h2>

        <p className="mt-3 text-sm text-neutral-600 leading-6">
          You selected that you do not mind masculine,
          feminine, or unisex fragrance directions.
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