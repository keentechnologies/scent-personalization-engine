

"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  submitPerceptionStage,
  getPerceptionStage,
} from "@/services/api/perception";

const descriptors = [
  {
    key: "p_1",
    label: "Professional",
  },

  {
    key: "p_2",
    label: "Approachable",
  },

  {
    key: "p_3",
    label: "Confident",
  },

  {
    key: "p_4",
    label: "Commanding",
  },

  {
    key: "p_5",
    label: "Effortless",
  },

  {
    key: "p_6",
    label: "Refined",
  },

  {
    key: "p_7",
    label: "Elite",
  },

  {
    key: "p_8",
    label: "Grounded",
  },

  {
    key: "p_9",
    label: "Dependable",
  },

  {
    key: "p_10",
    label: "Mature",
  },

  {
    key: "p_11",
    label: "Youthful",
  },

  {
    key: "p_12",
    label: "Romantic",
  },

  {
    key: "p_13",
    label: "Mysterious",
  },

  {
    key: "p_14",
    label: "Bold",
  },

  {
    key: "p_15",
    label: "Expressive",
  },

  {
    key: "p_16",
    label: "Subtle",
  },

  {
    key: "p_17",
    label: "Fresh",
  },

  {
    key: "p_18",
    label: "Light",
  },

  {
    key: "p_19",
    label: "Energizing",
  },

  {
    key: "p_20",
    label: "Rich",
  },

  {
    key: "p_21",
    label: "Attractive",
  },

  {
    key: "p_22",
    label: "Warm",
  },
];

type PerceptionState = {
  p_1: boolean;

  p_2: boolean;

  p_3: boolean;

  p_4: boolean;

  p_5: boolean;

  p_6: boolean;

  p_7: boolean;

  p_8: boolean;

  p_9: boolean;

  p_10: boolean;

  p_11: boolean;

  p_12: boolean;

  p_13: boolean;

  p_14: boolean;

  p_15: boolean;

  p_16: boolean;

  p_17: boolean;

  p_18: boolean;

  p_19: boolean;

  p_20: boolean;

  p_21: boolean;

  p_22: boolean;
};

const initialState: PerceptionState = {
  p_1: false,

  p_2: false,

  p_3: false,

  p_4: false,

  p_5: false,

  p_6: false,

  p_7: false,

  p_8: false,

  p_9: false,

  p_10: false,

  p_11: false,

  p_12: false,

  p_13: false,

  p_14: false,

  p_15: false,

  p_16: false,

  p_17: false,

  p_18: false,

  p_19: false,

  p_20: false,

  p_21: false,

  p_22: false,
};

export default function PerceptionStage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [validationError, setValidationError] =
    useState("");

  const [answers, setAnswers] =
    useState<PerceptionState>(initialState);

  const handleToggle = (
    key: keyof PerceptionState,
  ) => {
    setAnswers((prev) => ({
      ...prev,

      [key]: !prev[key],
    }));
  };

  const selectedCount =
    Object.values(answers).filter(Boolean)
      .length;

  const handleSubmit = async () => {
    if (selectedCount < 5) {
      setValidationError(
        "Please select at least 5 descriptors.",
      );

      return;
    }

    try {
      setLoading(true);

      setValidationError("");

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
        await submitPerceptionStage(payload);

      console.log(
        "PERCEPTION STAGE SUBMITTED",
        response,
      );

      router.push("/quiz/personality");

    } catch (error) {

      console.log(
        "FAILED TO SUBMIT PERCEPTION",
        error,
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const fetchPerceptionStage = async () => {
      try {

        const sessionId =
          localStorage.getItem("session_id");

        if (!sessionId) {
          return;
        }

        const response =
          await getPerceptionStage(sessionId);

        console.log(
          "PERCEPTION RESTORE",
          response,
        );

        setAnswers({
          p_1: response.p_1,

          p_2: response.p_2,

          p_3: response.p_3,

          p_4: response.p_4,

          p_5: response.p_5,

          p_6: response.p_6,

          p_7: response.p_7,

          p_8: response.p_8,

          p_9: response.p_9,

          p_10: response.p_10,

          p_11: response.p_11,

          p_12: response.p_12,

          p_13: response.p_13,

          p_14: response.p_14,

          p_15: response.p_15,

          p_16: response.p_16,

          p_17: response.p_17,

          p_18: response.p_18,

          p_19: response.p_19,

          p_20: response.p_20,

          p_21: response.p_21,

          p_22: response.p_22,
        });

      } catch (error) {

        console.log(
          "NO EXISTING PERCEPTION DATA",
          error,
        );

      }
    };

    fetchPerceptionStage();
  }, []);

  return (
    <div className="flex-1 flex flex-col px-6 py-6 md:py-8 bg-transparent">
      {/* ── Heading ── */}
      <div className="space-y-2">
        <h1 className="font-serif text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-obsidian">
          Perception
        </h1>
        <p className="text-[14px] text-text-muted leading-relaxed">
          Select at least 5 descriptors that best match how you want your fragrance to feel.
        </p>
      </div>

      {/* ── Descriptors Cloud ── */}
      <div className="mt-8 flex flex-wrap gap-2.5 flex-1 content-start">
        {descriptors.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() =>
              handleToggle(
                item.key as keyof PerceptionState,
              )
            }
            className={`rounded-full px-5 py-2.5 text-[14px] font-semibold border-2 transition-all duration-200 cursor-pointer active:scale-[0.96] ${
              answers[item.key as keyof PerceptionState]
                ? "border-obsidian bg-obsidian text-cream shadow-sm"
                : "border-border bg-white text-obsidian md:hover:bg-ivory/50 md:hover:border-border-strong"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ── Selection Count and Error Info ── */}
      <div className="mt-6">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-text-muted">
          {selectedCount} Selected (Min 5)
        </p>

        {validationError && (
          <p className="mt-2 text-sm text-error font-medium">
            {validationError}
          </p>
        )}
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
          onClick={() => router.push("/quiz/gender")}
          className="mt-3 flex h-[52px] w-full items-center justify-center rounded-2xl border-2 border-obsidian bg-transparent text-[15px] font-semibold tracking-wide text-obsidian transition-all duration-200 active:scale-[0.98] cursor-pointer md:hover:bg-obsidian/5"
        >
          Back
        </button>
      </div>
    </div>
  );
}