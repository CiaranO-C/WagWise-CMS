import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../services/authService";

async function getToken(abortSignal) {
  let token = localStorage.getItem("accessToken");

  if (token && !isTokenExpired(token)) return { token, error: null };

  //token null or expired, check refresh token
  if (getRefreshToken()) {
    const isRefreshed = await refreshToken(abortSignal);
    if (isRefreshed) {
      token = localStorage.getItem("accessToken");
      return { token, error: null };
    }
  }
  //tokens invalid/couldn't be refreshed
  return { token: null, error: abortSignal?.aborted ? "aborted" : "badTokens" };
}

function getRefreshToken() {
  const token = sessionStorage.getItem("refreshToken");
  const isExpired = token ? isTokenExpired(token) : null;

  if (isExpired || !token) return false;

  return token;
}

function isTokenExpired(token) {
  const { exp } = jwtDecode(token);
  // Get current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  const isExpired = exp < currentTime;
  return isExpired;
}

const API_URL = import.meta.env.VITE_API_URL;

export { getToken, API_URL };
