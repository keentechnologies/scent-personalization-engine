

"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  submitPersonalityStage,
  getPersonalityStage,
} from "@/services/api/personality";

import PersonalityConfirmationModal from "./personality-confirmation-modal";

const personalities = [
  {
    key: "pr_1",

    title: "The Minimalist Professional",

    description:
      "You like to keep things simple, clean, and put-together. You prefer not to stand out too much but always come across as sharp and well-groomed.",
  },

  {
    key: "pr_2",

    title: "The Power Player",

    description:
      "You enjoy making an impact wherever you go. You naturally carry confidence and like being noticed for your strong and commanding presence.",
  },

  {
    key: "pr_3",

    title: "The Romantic Charmer",

    description:
      "You are warm, expressive, and enjoy meaningful connections. You like leaving a soft, memorable impression that feels inviting and attractive.",
  },

  {
    key: "pr_4",

    title: "The Playful Energiser",

    description:
      "You are lively, fun, and bring energy into every room. You enjoy feeling fresh, vibrant, and a little spontaneous in your everyday life.",
  },

  {
    key: "pr_5",

    title: "The Comfort Seeker",

    description:
      "You prefer things that feel familiar, warm, and easy. You like to stay relaxed and enjoy scents that feel cozy and comforting throughout the day.",
  },
];

type PersonalityState = {
  pr_1: number;

  pr_2: number;

  pr_3: number;

  pr_4: number;

  pr_5: number;
};

const initialState: PersonalityState = {
  pr_1: 0,

  pr_2: 0,

  pr_3: 0,

  pr_4: 0,

  pr_5: 0,
};

export default function PersonalityStage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState(false);

  const [answers, setAnswers] =
    useState<PersonalityState>(initialState);

  const handleSliderChange = (
    key: keyof PersonalityState,
    value: number,
  ) => {
    setAnswers((prev) => ({
      ...prev,

      [key]: value,
    }));
  };

  const anyZero =
    answers.pr_1 === 0 ||
    answers.pr_2 === 0 ||
    answers.pr_3 === 0 ||
    answers.pr_4 === 0 ||
    answers.pr_5 === 0;

  const submitPersonality = async () => {
    try {
      setLoading(true);

      const sessionId =
        localStorage.getItem("session_id");

      if (!sessionId) {
        throw new Error("Session not found");
      }

      const payload = {
        session_id: sessionId,

        ...answers,
      };

      const response =
        await submitPersonalityStage(payload);

      console.log(
        "PERSONALITY STAGE SUBMITTED",
        response,
      );

      router.push("/quiz/occasion");

    } catch (error) {

      console.log(
        "FAILED TO SUBMIT PERSONALITY",
        error,
      );

    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {

    if (anyZero) {
      setShowConfirmationModal(true);

      return;
    }

    await submitPersonality();
  };

  const handleConfirmationContinue = async () => {
    setShowConfirmationModal(false);

    await submitPersonality();
  };

  const handleConfirmationCancel = () => {
    setShowConfirmationModal(false);
  };

  useEffect(() => {

    const fetchPersonalityStage = async () => {
      try {

        const sessionId =
          localStorage.getItem("session_id");

        if (!sessionId) {
          return;
        }

        const response =
          await getPersonalityStage(sessionId);

        console.log(
          "PERSONALITY RESTORE",
          response,
        );

        setAnswers({
          pr_1: response.pr_1,

          pr_2: response.pr_2,

          pr_3: response.pr_3,

          pr_4: response.pr_4,

          pr_5: response.pr_5,
        });

      } catch (error) {

        console.log(
          "NO EXISTING PERSONALITY DATA",
          error,
        );

      }
    };

    fetchPersonalityStage();
  }, []);

  return (
    <>

      <PersonalityConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={handleConfirmationContinue}
        onCancel={handleConfirmationCancel}
      />

      <div className="flex-1 flex flex-col px-6 py-6 md:py-8 bg-transparent">
        {/* ── Heading ── */}
        <div className="space-y-2">
          <h1 className="font-serif text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-obsidian">
            Personality Fit
          </h1>
          <p className="text-[14px] text-text-muted leading-relaxed">
            How strongly does each personality type reflect who you are? Rate each on a scale from 0 to 100.
          </p>
        </div>

        {/* ── Personality Sliders ── */}
        <div className="mt-8 space-y-6 flex-1">
          {personalities.map((item) => (
            <div
              key={item.key}
              className="space-y-4 rounded-3xl border-2 border-border bg-white p-5 shadow-sm transition-all hover:border-border-strong"
            >
              <div className="space-y-1.5">
                <h2 className="font-serif text-[18px] font-bold text-obsidian">
                  {item.title}
                </h2>
                <p className="text-[13px] text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={answers[item.key as keyof PersonalityState]}
                  onChange={(event) =>
                    handleSliderChange(
                      item.key as keyof PersonalityState,
                      Number(event.target.value),
                    )
                  }
                  style={{
                    background: `linear-gradient(to right, #0A0A0A 0%, #0A0A0A ${answers[item.key as keyof PersonalityState]}%, #F5F0EB ${answers[item.key as keyof PersonalityState]}%, #F5F0EB 100%)`
                  }}
                  className="w-full accent-obsidian h-1.5 rounded-lg appearance-none cursor-pointer border border-border"
                />

                <div className="flex justify-between text-[12px] font-bold text-text-muted uppercase tracking-wider">
                  <span>Not at all</span>
                  <span className="text-obsidian font-serif text-[14px]">
                    {answers[item.key as keyof PersonalityState]}%
                  </span>
                  <span>Very much</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Continue & Back Buttons ── */}
        <div className="mt-8 pt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="group relative flex h-[52px] w-full items-center justify-center overflow-hidden rounded-2xl bg-obsidian text-[15px] font-semibold tracking-wide text-cream transition-all duration-200 active:scale-[0.98] disabled:opacity-35 disabled:active:scale-100 cursor-pointer md:hover:shadow-lg md:hover:-translate-y-[1px]"
          >
            <span className="relative z-10">
              {loading ? "Submitting..." : "Continue"}
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <button
            type="button"
            onClick={() => router.push("/quiz/perception")}
            className="mt-3 flex h-[52px] w-full items-center justify-center rounded-2xl border-2 border-obsidian bg-transparent text-[15px] font-semibold tracking-wide text-obsidian transition-all duration-200 active:scale-[0.98] cursor-pointer md:hover:bg-obsidian/5"
          >
            Back
          </button>
        </div>
      </div>

    </>
  );
}