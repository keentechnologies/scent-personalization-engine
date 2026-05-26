"use client";

import { useState } from "react";
import { verifyMSG91Token } from "@/services/api/auth";
import { setAuthData } from "@/lib/auth-storage";

type OTPModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function OTPModal({ open, onClose }: OTPModalProps) {
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = () => {
    if (!otp) return;

    setLoading(true);

    window.verifyOtp(
      otp,

      async (data) => {
        try {
          const verifiedData = data as {
            message: string;
          };

          console.log("MSG91 VERIFIED", verifiedData);

          const authResponse = await verifyMSG91Token({
            access_token: verifiedData.message,
          });
          console.log("BACKEND AUTH SUCCESS");
          setAuthData(authResponse);
        } catch (error) {
          console.log("BACKEND AUTH FAILED", error);
        } finally {
          setLoading(false);
        }
      },

      (error) => {
        console.log("INVALID OTP", error);

        setLoading(false);
      },
    );
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
    </div>
  );
}
