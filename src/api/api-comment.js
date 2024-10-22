import { API_URL, getToken } from "./utils";

async function updateFlag(id) {
  const token = getToken();
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

async function deleteComment(id) {
  const token = getToken();
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

async function deleteFlagged() {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/user/admin/comments`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return false;

  return true;
}

async function fetchComments() {
  const token = getToken();
  const res = await Promise.all([
    fetch(`${API_URL}/api/user/admin/comments/recent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`${API_URL}/api/user/admin/comments/review`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);
  if (!res[0].ok || !res[1].ok) return false;

  const { recent } = await res[0].json();
  const { review } = await res[1].json();
  return [recent, review];
}

async function getAllComments() {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/user/admin/comments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return { comments: null, status: res.status };

  const comments = await res.json();

  return { comments, status: res.status };
}

export { updateFlag, deleteComment, deleteFlagged, fetchComments, getAllComments };
