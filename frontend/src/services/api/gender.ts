
const API_BASE_URL = "http://localhost:8000";

type GenderPayload = {
  session_id: string;

  masculine_score: number;

  feminine_score: number;

  unisex_score: number;
};

export async function submitGenderStage(
  payload: GenderPayload,
) {
  const token =
    localStorage.getItem("jwt_token");

  console.log(payload);

  const response = await fetch(
    `${API_BASE_URL}/quiz/stages/gender/submit`,
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
      "GENDER API ERROR",
      errorData,
    );

    throw new Error(
      "Failed to submit gender stage",
    );
  }

  return response.json();
}

export async function getGenderStage(
  sessionId: string,
) {
  const token =
    localStorage.getItem("jwt_token");

  const response = await fetch(
    `${API_BASE_URL}/quiz/stages/gender/${sessionId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch gender stage",
    );
  }

  return response.json();
}