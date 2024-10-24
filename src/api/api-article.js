import { API_URL, getToken } from "./utils";

async function getPublished(params, signal) {
  //to be used in promise.all
  const path = params
    ? `${API_URL}/api/articles?${params}`
    : `${API_URL}/api/articles`;
  const res = await fetch(path, { signal });

  return res.json();
}

async function getUnpublished(params, signal, token) {
  //to be used in promise.all
  const path = params
    ? `${API_URL}/api/articles/admin/unpublished?${params}`
    : `${API_URL}/api/articles/admin/unpublished`;
  const res = await fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  });

  return res.json();
}

async function deleteArticle(id) {
  const { token, error } = await getToken();
  if (token && !error) {
    const res = await fetch(`${API_URL}/api/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return false;
    }

    return true;
  }
}

async function fetchArticle(id, signal) {
  try {
    const res = await fetch(`${API_URL}/api/articles/${id}`, { signal });

    if (!res.ok) return false;

    const { article } = await res.json();
    return article;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch article aborted");
    }
  }
}

async function searchArticles(search, signal, token) {
  try {
    if (token) {
      const res = await fetch(`${API_URL}/api/articles/admin/search${search}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });

      if (!res.ok) return false;

      const { articles } = await res.json();
      return articles;
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Search articles aborted");
    }
  }
}

async function togglePublish(id, toggle) {
  try {
    const { token, error } = await getToken();
    if (token && !error) {
      const res = await fetch(`${API_URL}/api/articles/${id}/${toggle}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return false;

      return true;
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateArticle(id, data) {
  const { token, error } = await getToken();
  if (token && !error) {
    const res = await fetch(`${API_URL}/api/articles/${id}`, {
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
}

async function createArticle(data) {
  const { token, error } = await getToken();
  if (token && !error) {
    const res = await fetch(`${API_URL}/api/articles`, {
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
