import { API_URL, getToken } from "./utils";

async function deleteTag(tagName) {
  const { token, error } = await getToken();
  if (token && !error) {
    const res = await fetch(`${API_URL}/api/tags/${tagName}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return false;
    }

    return true;
  }
}

async function handleNewTag(tagName, setError) {
  try {
    if (!tagName) {
      return setError("Tag name cannot be empty");
    }
    const res = await fetch(`${API_URL}/api/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: new URLSearchParams({
        tagName,
      }),
    });

    if (res.ok) {
      return true;
    }
  } catch (err) {
    //setErrors(err.message);
  }
}

async function getMostUsedTags(signal) {
  //to be used in promise.all
  try {
    const res = await fetch(`${API_URL}/api/tags`, { signal });
    return res.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch most used tags aborted");
    }
  }
}

async function getAllTags(signal, token) {
  try {
    const res = await fetch(`${API_URL}/api/tags/admin/all`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });

    if (!res.ok) return { tags: null, status: res.status };

    const { tags } = await res.json();
    return { tags, status: res.status };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch all tags aborted");
    }
  }
}

async function getTaggedArticles(tagName, signal, token) {
  try {
    const res = await fetch(`${API_URL}/api/tags/admin/${tagName}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });

    if (!res.ok) return { articles: null, status: res.status };

    const { tag } = await res.json();

    return { articles: tag.articles, status: res.status };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch tagged articles aborted");
    }
  }
}

export {
  deleteTag,
  handleNewTag,
  getMostUsedTags,
  getAllTags,
  getTaggedArticles,
};
