async function login(username, password) {
  try {
    const res = await postLogin(username, password);
    const resJson = await res.json();
    console.log(res.ok, username, password);

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
  const response = await fetch("http://localhost:5500/api/user/log-in", {
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

async function logout() {
  //remove token from local storage
  deleteToken();
  //force reload to wipe user state
  window.location.reload();
}

function deleteToken() {
  localStorage.removeItem("accessToken");
}

async function refreshToken() {
  try {
    const res = await fetch("http://localhost:5500/api/user/refresh-token", {
      credentials: "include",
    });
    if (res.ok) {
      const { jwt } = await res.json();
      storeToken(jwt);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to refresh access token");
  }
}

export { login, logout, refreshToken, getToken };
