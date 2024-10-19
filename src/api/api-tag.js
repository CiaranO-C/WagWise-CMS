import { getToken } from "./utils";

async function deleteTag(tagName) {
  const token = getToken();
  const res = await fetch(`https://wagwise-production.up.railway.app/api/tags/${tagName}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return false;
  }

  return true;
}

async function handleNewTag(tagName, setError) {
  try {
    if (!tagName) {
      return setError("Tag name cannot be empty");
    }
    const res = await fetch("https://wagwise-production.up.railway.app/api/tags", {
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

async function getMostUsedTags() {
  //to be used in promise.all
  const res = await fetch("https://wagwise-production.up.railway.app/api/tags");
  return res.json();
}

async function getAllTags() {
  const token = getToken();
  const res = await fetch("https://wagwise-production.up.railway.app/api/tags/admin/all", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return { tags: null, status: res.status };

  const { tags } = await res.json();
  return { tags, status: res.status };
}

async function getTaggedArticles(tagName) {
  const token = getToken();
  const res = await fetch(`https://wagwise-production.up.railway.app/api/tags/admin/${tagName}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return { articles: null, status: res.status };

  const { tag } = await res.json();

  return { articles: tag.articles, status: res.status };
}

export {
  deleteTag,
  handleNewTag,
  getMostUsedTags,
  getAllTags,
  getTaggedArticles,
};
