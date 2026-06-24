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
            className="fixed inset-0 z-[60] bg-[#0A0A0A]/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as const }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          >
            <div className="w-full max-w-sm rounded-[32px] bg-[#1d1a17]/95 border border-border backdrop-blur-xl p-7 shadow-[0_24px_50px_rgba(0,0,0,0.6)] overflow-hidden relative">
              {/* Ambient card glow */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle,rgba(196,130,58,0.12)_0%,transparent_70%)] pointer-events-none" />

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c4823a]/10 border border-[#c4823a]/20 relative z-10">
                <span className="text-xl font-bold text-gold">↻</span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h2 className="mt-5 heading-serif text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#f3efe8]">
                  Welcome Back
                </h2>

                <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">
                  You have an unfinished discovery in the{" "}
                  <span className="font-semibold text-[#f3efe8]">
                    {stageLabel}
                  </span>{" "}
                  stage. Would you like to pick up where you left off?
                </p>
              </div>

              {/* Actions */}
              <div className="mt-7 space-y-3 relative z-10">
                <button
                  onClick={onContinue}
                  className="group btn-gold relative h-13 w-full overflow-hidden rounded-2xl text-[15px] font-semibold tracking-wide active:scale-[0.98] disabled:active:scale-100"
                >
                  <span className="relative z-10">Continue Discovery →</span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </button>

                <button
                  onClick={onStartFresh}
                  className="btn-outline h-13 w-full rounded-2xl text-[15px] font-medium tracking-wide"
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