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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-md">
      <div className="w-full max-w-sm rounded-[32px] bg-[#1d1a17]/95 border border-border p-8 text-center shadow-[0_24px_50px_rgba(0,0,0,0.6)] overflow-hidden relative">
        {/* Ambient card glow */}
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle,rgba(196,130,58,0.12)_0%,transparent_70%)] pointer-events-none" />

        {/* Spinner */}
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gold/20 border-t-gold relative z-10" />

        <h2 className="mt-6 heading-serif text-[22px] font-semibold text-[#f3efe8] relative z-10">
          Creating Your Recommendations
        </h2>

        <p className="mt-3 text-[14px] leading-relaxed text-text-secondary relative z-10">
          {message}
        </p>
      </div>
    </div>
  );
}