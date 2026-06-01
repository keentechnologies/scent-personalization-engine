

type ProcessingModalProps = {
  isOpen: boolean;

  message: string;
};

export default function ProcessingModal({
  isOpen,
  message,
}: ProcessingModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">

      <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">

        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-neutral-300 border-t-black" />

        <h2 className="mt-6 text-xl font-semibold">
          Creating Your Recommendations
        </h2>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          {message}
        </p>

      </div>

    </div>
  );
}