import { getToken } from "./utils";

async function fetchUsers() {
  const token = getToken();
  const res = await fetch("https://wagwise-production.up.railway.app/api/user/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return false;

  const { users } = await res.json();
  return users;
}

async function getUser() {
  try {
    const token = getToken();
    const res = await fetch("https://wagwise-production.up.railway.app/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const user = await res.json();
      return { user, status: res.status };
    }
    return { user: null, status: res.status };

  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

export { fetchUsers, getUser };
