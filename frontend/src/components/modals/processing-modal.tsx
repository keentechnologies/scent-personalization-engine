

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-cream border border-border p-8 text-center shadow-xl">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-sand/45 border-t-obsidian" />

        <h2 className="mt-6 font-serif text-[22px] font-semibold text-obsidian">
          Creating Your Recommendations
        </h2>

        <p className="mt-3 text-[14px] leading-relaxed text-text-muted">
          {message}
        </p>
      </div>
    </div>
  );
}