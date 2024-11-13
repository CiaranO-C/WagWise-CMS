import { getUser } from "../api/api-user";
import { API_URL } from "../api/utils";

async function login(username, password) {
  try {
    const res = await postLogin(username, password);
    const resJson = await res.json();
    const { user, jwt, refreshToken } = resJson;
    if (res.ok && user.role === "ADMIN") {
      storeToken(jwt);
      storeRefreshToken(refreshToken);
    } else if (res.ok) {
      return { error: "User is not an admin" };
    }
    return resJson;
  } catch (error) {
    console.error(error);
  }
}

async function postLogin(username, password) {
  const response = await fetch(`${API_URL}/api/user/log-in`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      username,
      password,
    }),
  });
  return response;
}

function storeToken(token) {
  localStorage.setItem("accessToken", token);
}

function getToken() {
  const token = localStorage.getItem("accessToken");
  return token;
}

function logout() {
  deleteTokens();
}

function deleteTokens() {
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
}

async function refreshToken(signal) {
  try {
    const token = sessionStorage.getItem("refreshToken");

    const res = await fetch(`${API_URL}/api/user/refresh-token`, {
      headers: {
        refresh: token,
      },
      signal,
    });
    if (!res.ok) {
      deleteTokens();
      return false;
    }

    const { jwt, refreshToken } = await res.json();
    storeToken(jwt);
    storeRefreshToken(refreshToken);
    return true;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Refresh token aborted");
    } else {
      console.error(error);
      throw new Error("Failed to refresh access token");
    }
  }
}

function storeRefreshToken(token) {
  sessionStorage.setItem("refreshToken", token);
}

async function userLoader(abortSignal) {
  let userData = await getUser(abortSignal);
  let user = userData?.user || null;

  // unauthorized - invalid token
  if (userData?.status === 401) {
    const refreshAccess = await refreshToken(abortSignal);

    if (refreshAccess) {
      userData = await getUser(abortSignal);
      user = userData?.user || null;
    }
  }
  return user;
}

export { login, logout, refreshToken, getToken, userLoader };
