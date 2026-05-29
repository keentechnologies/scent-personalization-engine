

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
    label: "Attention-grabbing",
  },

  {
    key: "p_6",
    label: "Understated",
  },

  {
    key: "p_7",
    label: "Effortless",
  },

  {
    key: "p_8",
    label: "Refined",
  },

  {
    key: "p_9",
    label: "Luxurious",
  },

  {
    key: "p_10",
    label: "Elite",
  },

  {
    key: "p_11",
    label: "Polished",
  },

  {
    key: "p_12",
    label: "Grounded",
  },

  {
    key: "p_13",
    label: "Dependable",
  },

  {
    key: "p_14",
    label: "Playful",
  },

  {
    key: "p_15",
    label: "Romantic",
  },

  {
    key: "p_16",
    label: "Inviting",
  },

  {
    key: "p_17",
    label: "Bold",
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
    <main className="min-h-screen bg-white">

      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">

        <div className="space-y-2">

          <h1 className="text-3xl font-semibold">
            Perception
          </h1>

          <p className="text-sm text-neutral-500 leading-6">
            Select at least 5 descriptors that best
            match how you want your fragrance to
            feel.
          </p>

        </div>

        <div className="mt-10 flex flex-wrap gap-3">

          {descriptors.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() =>
                handleToggle(
                  item.key as keyof PerceptionState,
                )
              }
              className={`rounded-2xl border px-4 py-3 text-sm ${
                answers[
                  item.key as keyof PerceptionState
                ]
                  ? "border-black bg-black text-white"
                  : "border-neutral-300"
              }`}
            >
              {item.label}
            </button>
          ))}

        </div>

        <div className="mt-4">

          <p className="text-sm text-neutral-500">
            {selectedCount} selected
          </p>

          {validationError && (
            <p className="mt-2 text-sm text-red-500">
              {validationError}
            </p>
          )}

        </div>

        <div className="mt-auto pt-10">

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="h-14 w-full rounded-2xl bg-black text-white disabled:opacity-40"
          >
            {loading ? "Submitting..." : "Continue"}
          </button>

        </div>

      </div>

    </main>
  );
}