const API_BASE_URL = "http://localhost:8000";

type OccasionPayload = {
  session_id: string;

  [key: string]: boolean | string;
};

export async function submitOccasionStage(
  payload: OccasionPayload,
) {
  const token =
    localStorage.getItem("jwt_token");

  console.log(payload);

  const response = await fetch(
    `${API_BASE_URL}/quiz/stages/occasion/submit`,
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
      "OCCASION API ERROR",
      errorData,
    );

    throw new Error(
      "Failed to submit occasion stage",
    );
  }

  return response.json();
}

export async function getOccasionStage(
  sessionId: string,
) {
  const token =
    localStorage.getItem("jwt_token");

  const response = await fetch(
    `${API_BASE_URL}/quiz/stages/occasion/${sessionId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch occasion stage",
    );
  }

  return response.json();
}
