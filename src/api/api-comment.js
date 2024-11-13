import { API_URL, getToken } from "./utils";

async function updateFlag(id) {
  const { token, error } = await getToken();
  if ((token, !error)) {
    const res = await fetch(`${API_URL}/api/user/admin/comments/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    return true;
  }
}

async function deleteComment(id) {
  const { token, error } = await getToken();
  if (token && !error) {
    const res = await fetch(`${API_URL}/api/user/admin/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    return true;
  }
}

async function deleteFlagged() {
  const { token, error } = await getToken();
  if (token && !error) {
    const res = await fetch(`${API_URL}/api/user/admin/comments`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return false;

    return true;
  }
}

async function fetchComments(signal) {
  try {
    const { token, error } = await getToken(signal);
    if (token && !error) {
      const res = await Promise.all([
        fetch(`${API_URL}/api/user/admin/comments/recent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal,
        }),
        fetch(`${API_URL}/api/user/admin/comments/review`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal,
        }),
      ]);
      if (!res[0].ok || !res[1].ok) return false;

      const { recent } = await res[0].json();
      const { review } = await res[1].json();
      return { recent, review };
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch comments aborted");
    }
  }
}

async function getAllComments(token, signal) {
  try {
    const res = await fetch(`${API_URL}/api/user/admin/comments`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
    if (!res.ok) return { comments: null, status: res.status };

    const { comments } = await res.json();

    return { comments, status: res.status };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch all comments aborted");
    }
  }
}

export {
  updateFlag,
  deleteComment,
  deleteFlagged,
  fetchComments,
  getAllComments,
};
