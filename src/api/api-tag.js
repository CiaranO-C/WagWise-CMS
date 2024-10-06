async function deleteTag(tagName) {
  const token = getToken();
  const res = await fetch(`/api/tags/${tagName}`, {
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
    const res = await fetch("/api/tags", {
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

    //if server returns error message, re-render and display
  } catch (err) {
    //setErrors(err.message);
  }
}

export { deleteTag, handleNewTag };
