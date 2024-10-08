import { getToken } from "./utils";

async function getPublished(params) {
  //to be used in promise.all
  const path = params ? `/api/articles?${params}` : "/api/articles";
  const res = await fetch(path);

  return res.json();
}

async function getUnpublished(params) {
  //to be used in promise.all
  const token = getToken();

  const path = params
    ? `/api/articles/admin/unpublished?${params}`
    : "/api/articles/admin/unpublished";
  const res = await fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

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

async function fetchArticle(id) {
  const res = await fetch(`/api/articles/${id}`);

  if (!res.ok) return false;

  const { article } = await res.json();
  return article;
}

async function searchArticles(search) {
  const token = getToken();
  const res = await fetch(`/api/articles/admin/search${search}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return false;

  const { articles } = await res.json();
  return articles;
}

async function togglePublish(id, toggle) {
  try {
    const token = getToken();
    const res = await fetch(`/api/articles/${id}/${toggle}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return false;

    return true;
  } catch (error) {
    console.error(error);
  }
}

async function updateArticle(id, data) {
  const token = getToken();
  const res = await fetch(`/api/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.title,
      text: data.text,
      tagNames: data.tagNames,
    }),
  });

  if (!res.ok) return false;

  return true;
}

async function createArticle(data) {
  const token = getToken();
  const res = await fetch("/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.title,
      text: data.text,
      tagNames: data.tagNames,
    }),
  });

  if (!res.ok) return false;
  const { article } = await res.json();

  return article;
}

export {
  deleteArticle,
  fetchArticle,
  searchArticles,
  togglePublish,
  updateArticle,
  createArticle,
  getPublished,
  getUnpublished,
};
