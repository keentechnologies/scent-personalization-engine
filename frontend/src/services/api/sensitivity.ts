const API_BASE_URL = "http://localhost:8000";

type SensitivityPayload = {
  session_id: string;

  has_migraine_issues: boolean;

  has_respiratory_issues: boolean;

  has_skin_sensitivity: boolean;

  has_strong_smell_discomfort: boolean;

  has_body_odour_concern: boolean;
};

export async function submitSensitivityStage(payload: SensitivityPayload) {
  const token = localStorage.getItem("jwt_token");

  console.log(payload);

  const response = await fetch(
    `${API_BASE_URL}/quiz/stages/sensitivity/submit`,
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
    const errorData = await response.json();

    console.log("SENSITIVITY API ERROR", errorData);

    throw new Error("Failed to submit sensitivity stage");
  }

  return response.json();
}


export async function getSensitivityStage(
  sessionId: string,
) {
  const token =
    localStorage.getItem("jwt_token");

  const response = await fetch(
    `${API_BASE_URL}/quiz/stages/sensitivity/${sessionId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch sensitivity stage",
    );
  }

  return response.json();
}