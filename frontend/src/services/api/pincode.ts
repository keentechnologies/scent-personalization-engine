const API_BASE_URL = "http://localhost:8000";

type PincodePayload = {
  pincode: string;
};

export async function checkFreeDelivery(
  payload: PincodePayload,
) {
  const token =
    localStorage.getItem("jwt_token");

  const response = await fetch(
    `${API_BASE_URL}/check-free-delivery`,
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

    console.log(
      "PINCODE API ERROR",
      errorData,
    );

    throw new Error(
      "Failed to check free delivery",
    );
  }

  return response.json();
}