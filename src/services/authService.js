import { getUser } from "../api/api-user";

async function login(username, password) {
  try {
    const res = await postLogin(username, password);
    const resJson = await res.json();
    if (res.ok && resJson.user.role === "ADMIN") {
      storeToken(resJson.jwt);
    } else if (res.ok) {
      return { error: "User is not an admin" };
    }
    return resJson;
  } catch (error) {
    console.error(error);
  }
}

async function postLogin(username, password) {
  const response = await fetch("https://wagwise-production.up.railway.app/api/user/log-in", {
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
    const res = await fetch("https://wagwise-production.up.railway.app/api/user/refresh-token", {
      credentials: "include",
    });
    if (!res.ok) return false;

    const { jwt } = await res.json();
    storeToken(jwt);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to refresh access token");
  }
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
