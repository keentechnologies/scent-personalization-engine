type VerifyMSG91Payload = {
  access_token: string;
};

export async function verifyMSG91Token({ access_token }: VerifyMSG91Payload) {
  const response = await fetch(
    "http://localhost:8000/auth/verify-msg91",

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        access_token,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  return response.json();
}

export async function getMe() {
  const token = localStorage.getItem("jwt_token");
  const response = await fetch("http://localhost:8000/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
}
