const API_BASE_URL = "http://localhost:8000";

type recommendationPayload = {
  session_id: string;
  pincode: string
};

export async function generateRecommendations(payload: recommendationPayload) {
  const token = localStorage.getItem("jwt_token");

  console.log(payload);

  const response = await fetch(
    `${API_BASE_URL}/recommendation/generate`,
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

    console.log("RECOMMENDATION API ERROR", errorData);

    throw new Error("Failed to generate recommendation");
  }

  return response.json();
}
