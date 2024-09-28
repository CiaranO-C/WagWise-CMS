import { CircleSpinner } from "react-spinners-kit";
import { Button, Content } from "../sharedStyles";
import ArticleEditor from "./Editor";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import ArticlePreview from "./ArticlePreview";

function ArticleEdit({ loading, setLoading, tags, article }) {
  const [view, setView] = useState("Edit");
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    title: article?.title || "",
    body: article?.body || "",
    tagNames: article?.tags.map((tag) => tag.tagName) || [],
  });
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  function handleSetInputs(data) {
    setInputs({
      ...inputs,
      ...data,
    });
  }

  function validatePreview() {
    for (const field in inputs) {
      if (!inputs[field]) {
        return setError(`${field} cannot be empty`);
      }
    }
    return true;
  }

  function handleView() {
    //if current view is edit, check to ensure input fields are not falsy
    //maybe create object to map errors to certain falsy values
    const valid = validatePreview();
    if (valid) {
      setView(oppositeView());
      setError(null);
    }
  }

  function oppositeView() {
    if (view === "Edit") {
      return "Preview";
    }
    return "Edit";
  }

  async function handleDelete() {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`/api/articles/${article.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      revalidator.revalidate();
      navigate("/admin/articles", { replace: true });
    }
  }

  return (
    <NewArticleMain>
      {loading && (
        <div className="overlay">
          <CircleSpinner />
        </div>
      )}
      <header className="mainHeader">
        {view === "Edit" ? (
          <>
            <h1>{article ? "Edit article" : "New article"}</h1>
            {error && error}
            <button onClick={handleDelete} disabled={!article}>
              Delete article
            </button>
          </>
        ) : (
          <>
            <h2>Preview</h2>
            <button onClick={handleView}>Edit</button>
          </>
        )}
      </header>
      {view === "Edit" ? (
        <ArticleEditor
          setView={handleView}
          tags={tags}
          article={article}
          setLoading={setLoading}
          inputs={inputs}
          setInputs={handleSetInputs}
        />
      ) : (
        <ArticlePreview inputs={inputs} />
      )}
    </NewArticleMain>
  );
}

const NewArticleMain = styled.main`
  ${Content}
  row-gap: 15px;
  justify-items: center;

  .overlay {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: #575757;
  }

  .mainHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1110px;
    border-bottom: 1px solid white;
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    color: white;

    h1 {
      font-size: 3.5rem;
      font-weight: 100;
    }

    button {
      ${Button}
      width: 100px;
    }
  }
`;

export default ArticleEdit;
