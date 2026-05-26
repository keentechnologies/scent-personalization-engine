export function setAuthData(data: {
  jwt_token: string;
  user_id: string;
  phone_number: string;
}) {
  localStorage.setItem("jwt_token", data.jwt_token);

  localStorage.setItem("user_id", data.user_id);

  localStorage.setItem("phone_number", data.phone_number);

  console.log("data saved");
}


export function getJWTToken() {
  return localStorage.getItem("jwt_token");
}

export function clearAuthData() {

  localStorage.removeItem("jwt_token");

  localStorage.removeItem("user_id");

  localStorage.removeItem("phone_number");
}