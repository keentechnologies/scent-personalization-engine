"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function OTPModal({ open, onClose }: OTPModalProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  const [existingSession, setExistingSession] = useState<{
    id: string;
    current_stage: string;
  } | null>(null);


  const handleContinueSession = () => {
    if (!existingSession) return;

    localStorage.setItem(
      "session_id",
      existingSession.id,
    );

    console.log(
      "CONTINUE SESSION:",
      existingSession.current_stage,
    );

    router.push(
      `/quiz/${existingSession.current_stage}`,
    );
  };

  const handleStartFreshSession = async () => {
    try {
      const response = await createSession();

      localStorage.setItem(
        "session_id",
        response.id,
      );

      console.log(
        "FRESH SESSION CREATED",
        localStorage.getItem("session_id")
      );

      router.push("/quiz/sensitivity");
    } catch (error) {
      console.log(
        "FAILED TO CREATE FRESH SESSION",
        error,
      );
    }
  };


  const handleVerifySuccess = async (data: unknown) => {
    try {
      const verifiedData = data as {
        message: string;
      };

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
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyFailure = (error: unknown) => {
    console.log("INVALID OTP", error);

    setLoading(false);
  };

  const handleVerifyOTP = () => {
    if (!otp) return;

    setLoading(true);

    window.verifyOtp(otp, handleVerifySuccess, handleVerifyFailure);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40">
      <div className="w-full rounded-t-3xl bg-white p-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Enter OTP</h2>

          <p className="text-sm text-neutral-500">
            OTP sent to your mobile number
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="h-14 w-full rounded-2xl border border-neutral-300 px-4 text-center text-lg tracking-[6px] outline-none"
          />

          <button
            onClick={handleVerifyOTP}
            disabled={loading}
            className="h-14 w-full rounded-2xl bg-black text-white disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button onClick={onClose} className="w-full text-sm text-neutral-500">
            Close
          </button>
        </div>
      </div>

      <SessionRecoveryModal
        open={showRecoveryModal}
        currentStage={existingSession?.current_stage || ""}
        onContinue={handleContinueSession}
        onStartFresh={handleStartFreshSession}
      />
    </div>
  );
}
