import { getToken } from "./utils";

async function updateFlag(id) {
  const token = getToken();
  const res = await fetch(`/api/user/admin/comments/${id}`, {
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
  const res = await fetch(`/api/user/admin/comments/${id}`, {
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
  const res = await fetch(`/api/user/admin/comments`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return false;

  return true;
}

export { updateFlag, deleteComment, deleteFlagged };
