function getToken() {
  const token = localStorage.getItem("accessToken");
  return token;
}

const API_URL = import.meta.env.VITE_API_URL;

export { getToken, API_URL };
