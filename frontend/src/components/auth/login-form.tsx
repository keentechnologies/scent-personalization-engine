"use client";

import { useEffect, useState } from "react";

import OTPModal from "./otp-modal";

export default function LoginForm() {
  const [phone, setPhone] = useState("");

  const [openOTP, setOpenOTP] = useState(false);

  const [msgReady, setMsgReady] = useState(false);

  const  widgetid = "3665736d6432313734393831";
  const token = "518113TCEO4Ahdl56a0c622dP1"

  useEffect(() => {
    const initializeMSG91 = () => {
      if (!window.initSendOTP) {
        console.log("MSG91 SDK not loaded yet");
        return;
      }

      const configuration = {
        widgetId: widgetid,

        tokenAuth: token,

        exposeMethods: true,

        success: (data: unknown) => {
          console.log("SUCCESS", data);
        },

        failure: (error: unknown) => {
          console.log("FAILURE", error);
        },
      };

      window.initSendOTP(configuration);

      setMsgReady(true);

      console.log("MSG91 INITIALIZED");
    };

    const timer = setTimeout(() => {
      initializeMSG91();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (!phone) return;

    if (!window.sendOtp) {
      console.log("sendOtp not available yet");
      return;
    }

    window.sendOtp(
      `91${phone}`,

      (data) => {
        console.log("OTP SENT", data);

        setOpenOTP(true);
      },

      (error) => {
        console.log("OTP ERROR", error);
      },
    );
  };

  return (
    <>
      <main className="flex min-h-screen flex-col px-6 py-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">Login</h1>

          <p className="text-sm text-neutral-500">Enter your mobile number</p>
        </div>

        <div className="mt-10 space-y-4">
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-14 w-full rounded-2xl border border-neutral-300 px-4 outline-none"
          />

          <button
            onClick={handleContinue}
            disabled={!msgReady}
            className="h-14 w-full rounded-2xl bg-black text-white disabled:opacity-50"
          >
            {msgReady ? "Continue" : "Loading..."}
          </button>
        </div>
      </main>

      <OTPModal open={openOTP} onClose={() => setOpenOTP(false)} />
    </>
  );
}
