"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import OTPModal from "./otp-modal";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [openOTP, setOpenOTP] = useState(false);
  const [msgReady, setMsgReady] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const widgetId = "3665736d6432313734393831";
  const tokenAuth = "518113TCEO4Ahdl56a0c622dP1";

  /* ── MSG91 SDK init (backend logic — untouched) ── */
  useEffect(() => {
    if (window.__msg91Initialized) return;

    const initializeMSG91 = () => {
      if (!window.initSendOTP) {
        console.log("MSG91 SDK not loaded yet");
        return;
      }

      const configuration = {
        widgetId,
        tokenAuth,
        exposeMethods: true,
        captchaRenderId: "msg91-captcha",
        success: (data: unknown) => {
          console.log("SUCCESS", data);
        },
        failure: (error: unknown) => {
          console.log("FAILURE", error);
        },
      };

      window.initSendOTP(configuration);
      window.__msg91Initialized = true;
      setMsgReady(true);
      console.log("MSG91 INITIALIZED");
    };

    const timer = setTimeout(() => {
      initializeMSG91();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  /* ── Send OTP handler (backend logic — untouched) ── */
  const handleContinue = () => {
    if (!phone) return;
    if (!window.sendOtp) {
      console.log("sendOtp not available yet");
      return;
    }

    setIsSending(true);
    window.sendOtp(
      `91${phone}`,
      (data) => {
        console.log("OTP SENT", data);
        setIsSending(false);
        setOpenOTP(true);
      },
      (error) => {
        console.log("OTP ERROR", error);
        setIsSending(false);
      },
    );
  };

  const isDisabled = !msgReady || phone.trim().length < 10 || isSending;

  /* Format phone for display: 98765 43210 */
  const formatPhone = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length > 5) return d.slice(0, 5) + " " + d.slice(5);
    return d;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
  };

  return (
    <>
      <main className="flex min-h-[100dvh] md:min-h-[710px] flex-col px-6 md:px-8 bg-transparent">

        {/* ── Top: Brand ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="flex items-center gap-2 pt-[max(1.25rem,env(safe-area-inset-top))] mt-4 md:mt-6"
        >
          <Image
            src="/assets/logo.png"
            alt="Crafted Sprays Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="heading-serif text-[19px] tracking-[.03em] text-[#f3efe8] font-semibold">
            Crafted Sprays
          </span>
        </motion.div>

        {/* ── Middle: Main content (vertically centered) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col justify-center py-8 md:py-10"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold"
          >
            Begin Your Discovery
          </motion.p>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="heading-serif text-[36px] md:text-[40px] leading-[1.1] tracking-[-0.02em] text-[#f3efe8] mt-3"
          >
            Let&rsquo;s Start
            <br />
            With You.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-4 text-[15px] leading-[1.6] text-text-secondary max-w-[340px]"
          >
            Enter your mobile number to begin your personalised fragrance discovery.
          </motion.p>

          {/* Phone input */}
          <motion.div variants={itemVariants} className="mt-8">
            <label
              htmlFor="phone-input"
              className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary mb-2"
            >
              Mobile Number
            </label>

            <div className="flex items-center gap-0 rounded-2xl border border-border bg-[#1d1a17]/60 backdrop-blur-md overflow-hidden transition-all duration-300 focus-within:border-gold focus-within:shadow-[0_0_0_4px_rgba(196,130,58,0.15)]">
              {/* Country code */}
              <div className="flex items-center justify-center bg-[#24201d]/50 px-4 h-[52px] border-r border-border shrink-0">
                <span className="text-[14px] font-semibold text-[#f3efe8] select-none">+91</span>
              </div>

              {/* Input */}
              <input
                id="phone-input"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={formatPhone(phone)}
                onChange={handlePhoneChange}
                className="h-[52px] flex-1 px-4 text-[17px] font-medium text-[#f3efe8] bg-transparent outline-none placeholder:text-text-secondary/30"
              />
            </div>

            {/* Captcha — required by MSG91 */}
            <div id="msg91-captcha" className="mt-2" />
          </motion.div>

          {/* Continue button */}
          <motion.div variants={itemVariants} className="mt-5">
            <button
              onClick={handleContinue}
              disabled={isDisabled}
              className="group btn-gold w-full h-[52px] rounded-2xl text-[15px] font-semibold tracking-wide relative overflow-hidden active:scale-[0.98] disabled:active:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                {!msgReady
                  ? "Preparing..."
                  : isSending
                    ? "Sending OTP..."
                    : "Continue →"}
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </motion.div>

          {/* Helper text */}
          <motion.p
            variants={itemVariants}
            className="mt-4 text-center text-[12px] text-text-secondary/50"
          >
            We&rsquo;ll send you a one-time verification code
          </motion.p>
        </motion.div>

        {/* ── Bottom: Tagline ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-border/40" />
            <span className="text-gold text-sm">✦</span>
            <div className="h-px flex-1 bg-border/40" />
          </div>

          <p className="text-center text-[12px] leading-[1.7] text-text-secondary/60">
            A few thoughtful questions.
            <br />
            A fragrance crafted around you.
          </p>
        </motion.div>
      </main>

      <OTPModal open={openOTP} onClose={() => setOpenOTP(false)} />
    </>
  );
}
