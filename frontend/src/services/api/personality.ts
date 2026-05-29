

const API_BASE_URL = "http://localhost:8000";

type PersonalityPayload = {
  session_id: string;

  pr_1: number;

  pr_2: number;

  pr_3: number;

  pr_4: number;

  pr_5: number;
};

export async function submitPersonalityStage(
  payload: PersonalityPayload,
) {
  const token =
    localStorage.getItem("jwt_token");

  console.log(payload);

  const response = await fetch(
    `${API_BASE_URL}/quiz/stages/personality/submit`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const errorData =
      await response.json();

    console.log(
      "PERSONALITY API ERROR",
      errorData,
    );

    throw new Error(
      "Failed to submit personality stage",
    );
  }

  return response.json();
}

export async function getPersonalityStage(
  sessionId: string,
) {
  const token =
    localStorage.getItem("jwt_token");

  const response = await fetch(
    `${API_BASE_URL}/quiz/stages/personality/${sessionId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch personality stage",
    );
  }

  return response.json();
}