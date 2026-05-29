

const API_BASE_URL = "http://localhost:8000";

type PerceptionPayload = {
  session_id: string;

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

export async function submitPerceptionStage(
  payload: PerceptionPayload,
) {
  const token =
    localStorage.getItem("jwt_token");

  console.log(payload);

  const response = await fetch(
    `${API_BASE_URL}/quiz/stages/perception/submit`,
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
      "PERCEPTION API ERROR",
      errorData,
    );

    throw new Error(
      "Failed to submit perception stage",
    );
  }

  return response.json();
}

export async function getPerceptionStage(
  sessionId: string,
) {
  const token =
    localStorage.getItem("jwt_token");

  const response = await fetch(
    `${API_BASE_URL}/quiz/stages/perception/${sessionId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch perception stage",
    );
  }

  return response.json();
}