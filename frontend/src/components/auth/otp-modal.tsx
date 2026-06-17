"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  runPostLoginFlow,
  type ExistingSessionResult,
} from "@/services/auth/post-login-flow";
import { createSession } from "@/services/api/session";
import SessionRecoveryModal from "./session-recovery-modal";

type OTPModalProps = {
  open: boolean;
  onClose: () => void;
};

const OTP_LENGTH = 4;

export default function OTPModal({ open, onClose }: OTPModalProps) {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [existingSession, setExistingSession] = useState<{
    id: string;
    current_stage: string;
  } | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input when modal opens
  useEffect(() => {
    if (open) {
      setDigits(Array(OTP_LENGTH).fill(""));
      setError("");
      setTimeout(() => inputRefs.current[0]?.focus(), 200);
    }
  }, [open]);

  /* ── Handle individual digit input ── */
  const handleDigitChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;

      const newDigits = [...digits];

      if (value.length > 1) {
        // Pasted content — fill from current position
        const pastedDigits = value.slice(0, OTP_LENGTH - index).split("");
        pastedDigits.forEach((d, i) => {
          if (index + i < OTP_LENGTH) newDigits[index + i] = d;
        });
        setDigits(newDigits);
        const nextIndex = Math.min(index + pastedDigits.length, OTP_LENGTH - 1);
        inputRefs.current[nextIndex]?.focus();
      } else {
        newDigits[index] = value;
        setDigits(newDigits);
        if (value && index < OTP_LENGTH - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    },
    [digits],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits],
  );

  /* ── Verify OTP (backend logic — untouched) ── */
  const handleContinueSession = () => {
    if (!existingSession) return;

    localStorage.setItem("session_id", existingSession.id);
    console.log("CONTINUE SESSION:", existingSession.current_stage);
    router.push(`/quiz/${existingSession.current_stage}`);
  };

  const handleStartFreshSession = async () => {
    try {
      const response = await createSession();
      localStorage.setItem("session_id", response.id);
      console.log("FRESH SESSION CREATED", localStorage.getItem("session_id"));
      router.push("/quiz/sensitivity");
    } catch (error) {
      console.log("FAILED TO CREATE FRESH SESSION", error);
    }
  };

  const handleVerifySuccess = async (data: unknown) => {
    try {
      const verifiedData = data as { message: string };
      const result = await runPostLoginFlow(verifiedData);

      if (result.type === "existing_session") {
        const existingSessionResult = result as ExistingSessionResult;
        setExistingSession(existingSessionResult.session);
        setShowRecoveryModal(true);
      }

      if (result.type === "new_session") {
        localStorage.setItem("session_id", result.session.id);
        console.log("NEW SESSION FLOW", result);
        router.push("/quiz/sensitivity");
      }
    } catch (error) {
      console.log("POST LOGIN FLOW FAILED", error);
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyFailure = (error: unknown) => {
    console.log("INVALID OTP", error);
    setError("Invalid OTP. Please check and try again.");
    setLoading(false);
    setDigits(Array(OTP_LENGTH).fill(""));
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  const handleVerifyOTP = () => {
    const otp = digits.join("");
    if (otp.length !== OTP_LENGTH) return;

    setLoading(true);
    setError("");
    window.verifyOtp(otp, handleVerifySuccess, handleVerifyFailure);
  };

  // Auto-verify when all 6 digits are filled
  useEffect(() => {
    const otp = digits.join("");
    if (otp.length === OTP_LENGTH && !loading) {
      handleVerifyOTP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  if (!open) return null;

  const otp = digits.join("");
  const isComplete = otp.length === OTP_LENGTH;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-obsidian/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal — bottom sheet on mobile, centered on desktop */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] as const }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md md:inset-0 md:flex md:items-center md:justify-center"
          >
            <div className="rounded-t-3xl md:rounded-3xl bg-cream px-6 md:px-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pb-8 pt-6 shadow-lg md:border md:border-border md:w-full md:max-w-sm">
              {/* Drag indicator */}
              <div className="mb-5 flex justify-center">
                <div className="h-1 w-10 rounded-full bg-border" />
              </div>

              {/* Header */}
              <div>
                <h2 className="font-serif text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-obsidian">
                  Verify Your Number
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-text-muted">
                  We&rsquo;ve sent a 4-digit code to your mobile number.
                </p>
              </div>

              {/* OTP Digit Boxes */}
              <div className="mt-8 flex justify-between gap-2.5">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData
                        .getData("text")
                        .replace(/\D/g, "")
                        .slice(0, OTP_LENGTH);
                      if (pasted) handleDigitChange(0, pasted);
                    }}
                    className={`h-14 w-full rounded-xl border text-center font-serif text-[22px] font-semibold outline-none transition-all duration-200 ${
                      digit
                        ? "border-sand bg-white text-obsidian shadow-sm"
                        : "border-border bg-ivory text-text-muted"
                    } focus:border-sand focus:bg-white focus:shadow-[0_0_0_3px_rgba(214,199,178,0.2)]`}
                  />
                ))}
              </div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-3 text-[13px] font-medium text-error"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Verify button */}
              <button
                onClick={handleVerifyOTP}
                disabled={loading || !isComplete}
                className="group relative mt-6 h-14 w-full overflow-hidden rounded-2xl bg-obsidian text-[15px] font-medium tracking-wide text-cream transition-all duration-200 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="relative z-10">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify & Continue →"
                  )}
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>

              {/* Close / resend */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="text-[13px] font-medium text-text-muted hover:text-obsidian transition-colors cursor-pointer"
                >
                  ← Change Number
                </button>
                <button
                  onClick={() => {
                    setDigits(Array(OTP_LENGTH).fill(""));
                    setError("");
                    inputRefs.current[0]?.focus();
                  }}
                  className="text-[13px] font-medium text-sand-dark hover:text-obsidian transition-colors cursor-pointer"
                >
                  Resend Code
                </button>
              </div>
            </div>
          </motion.div>

          <SessionRecoveryModal
            open={showRecoveryModal}
            currentStage={existingSession?.current_stage || ""}
            onContinue={handleContinueSession}
            onStartFresh={handleStartFreshSession}
          />
        </>
      )}
    </AnimatePresence>
  );
}
