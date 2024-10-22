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
  if (!token) return null;
  return token;
}

function logout() {
  //remove token from local storage
  deleteToken();
}

function deleteToken() {
  localStorage.removeItem("accessToken");
}

async function refreshToken() {
  try {
    const res = await fetch(`${API_URL}/api/user/refresh-token`, {
      headers: {
        refresh: sessionStorage.getItem("refreshToken"),
      },
    });
    if (!res.ok) return false;

    const { jwt, refreshToken } = await res.json();
    storeToken(jwt);
    storeRefreshToken(refreshToken);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to refresh access token");
  }
}

function storeRefreshToken(token) {
  sessionStorage.setItem("refreshToken", token);
}

async function userLoader() {
  const { user: initialUser, status: initialStatus } = await getUser();
  let user = initialUser;
  // unauthorized - invalid token
  if (initialStatus === 401) {
    const refreshAccess = await refreshToken();

    if (refreshAccess) {
      const { user: refreshUser } = await getUser();
      user = refreshUser;
    } else {
      //null value for user will force login page
      return null;
    }
  }
  return user;
}

export { login, logout, refreshToken, getToken, userLoader };
