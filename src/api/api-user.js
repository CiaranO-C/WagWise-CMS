import { API_URL, getToken } from "./utils";

async function fetchUsers(signal) {
  try {
    const { token, error } = await getToken(signal);
    if (token && !error) {
      const res = await fetch(`${API_URL}/api/user/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });

      if (!res.ok) return false;

      const { users } = await res.json();
      return users;
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch users aborted");
    }
  }
}

async function getUser(signal) {
  try {
    const { token } = await getToken(signal);
    const res = await fetch(`${API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    if (!res.ok) return { user: null, status: res.status };

    const user = await res.json();
    return { user, status: res.status };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Get user aborted");
    } else {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
}

export { fetchUsers, getUser };
