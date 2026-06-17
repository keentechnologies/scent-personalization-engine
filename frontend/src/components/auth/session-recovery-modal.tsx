"use client";

import { motion, AnimatePresence } from "framer-motion";

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

  const stageLabel = STAGE_LABELS[currentStage] || currentStage;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-obsidian/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as const }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          >
            <div className="w-full max-w-sm rounded-3xl bg-cream p-7 shadow-lg border border-border">
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ivory">
                <span className="text-xl text-sand-dark">↻</span>
              </div>

              {/* Content */}
              <h2 className="mt-5 font-serif text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-obsidian">
                Welcome Back
              </h2>

              <p className="mt-3 text-[14px] leading-relaxed text-text-muted">
                You have an unfinished discovery in the{" "}
                <span className="font-semibold text-obsidian">
                  {stageLabel}
                </span>{" "}
                stage. Would you like to pick up where you left off?
              </p>

              {/* Actions */}
              <div className="mt-7 space-y-3">
                <button
                  onClick={onContinue}
                  className="group relative h-13 w-full overflow-hidden rounded-2xl bg-obsidian text-[15px] font-medium tracking-wide text-cream transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  <span className="relative z-10">Continue Discovery →</span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </button>

                <button
                  onClick={onStartFresh}
                  className="h-13 w-full rounded-2xl border border-border text-[15px] font-medium tracking-wide text-text-primary transition-all duration-200 hover:bg-ivory hover:border-sand/40 cursor-pointer"
                >
                  Start Fresh
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}