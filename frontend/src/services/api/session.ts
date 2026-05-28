const API_BASE_URL = "http://localhost:8000";

export async function getCurrentSession() {
  const token = localStorage.getItem("jwt_token");

  const response = await fetch(
    `${API_BASE_URL}/sessions/current`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }

  return response.json();
}

export async function createSession() {
  const token = localStorage.getItem("jwt_token");

  const response = await fetch(
    `${API_BASE_URL}/sessions/start`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create session");
  }

  return response.json();
}