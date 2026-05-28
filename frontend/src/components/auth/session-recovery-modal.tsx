type SessionRecoveryModalProps = {
  open: boolean;

  currentStage: string;

  onContinue: () => void;

  onStartFresh: () => void;
};

const STAGE_LABELS: Record<string, string> = {
  sensitivity: "Sensitivity",

  gender: "Gender",

  perception: "Perception",

  personality: "Personality",

  occasion: "Occasion",
};

export default function SessionRecoveryModal({
  open,
  currentStage,
  onContinue,
  onStartFresh,
}: SessionRecoveryModalProps) {
  if (!open) return null;

  const stageLabel =
    STAGE_LABELS[currentStage] || currentStage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-sm rounded-3xl bg-white p-6">

        <div className="space-y-3">

          <h2 className="text-2xl font-semibold">
            Continue previous session?
          </h2>

          <p className="text-sm text-neutral-500">
            You have an unfinished quiz in{" "}
            <span className="font-medium text-black">
              {stageLabel}
            </span>{" "}
            stage.
          </p>

        </div>

        <div className="mt-6 space-y-3">

          <button
            onClick={onContinue}
            className="h-14 w-full rounded-2xl bg-black text-white"
          >
            Continue Session
          </button>

          <button
            onClick={onStartFresh}
            className="h-14 w-full rounded-2xl border border-neutral-300"
          >
            Start Fresh
          </button>

        </div>
      </div>
    </div>
  );
}