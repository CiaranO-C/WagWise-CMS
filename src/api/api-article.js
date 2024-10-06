async function deleteArticle(id) {
  const token = getToken();
  const res = await fetch(`/api/articles/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return false;
  }

  return true;
}

export { deleteArticle };
