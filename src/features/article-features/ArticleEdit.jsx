import ClipLoader from "react-spinners/ClipLoader";
import { Button, Content } from "../../components/sharedStyles";
import ArticleEditor from "./Editor";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticlePreview from "./ArticlePreview";
import { createPortal } from "react-dom";
import ConfirmModal from "../../components/ConfirmDeleteModal";
import { deleteArticle } from '../../api/api-article';

function ArticleEdit({ loading, setLoading, article }) {
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("Edit");
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    title: article?.title || "",
    body: article?.body || "",
    tagNames: article?.tags.map((tag) => tag.tagName) || [],
  });
  const navigate = useNavigate();

  function handleSetInputs(data) {
    setInputs({
      ...inputs,
      ...data,
    });
  }

  async function handleDeleteArticle(id) {
    const deleted = await deleteArticle(id);

    if (deleted) {
      setTimeout(() => {
        navigate("/admin/new_article", { replace: true });
      }, 2100);
      return true;
    }
    return false;
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

  return (
    <>
      <NewArticleMain>
        {loading && (
          <div className="overlay">
            <ClipLoader color='white' cssOverride={{ alignSelf: "center", justifySelf: "center" }}/>
          </div>
        )}
        <header className="mainHeader">
          {view === "Edit" ? (
            <>
              <h1>{article ? "Edit article" : "New article"}</h1>
              {error && error}
              <button onClick={() => setShowModal(true)} disabled={!article}>
                Delete article
              </button>
            </>
          ) : (
            <>
              <h1>Preview</h1>
              <button onClick={handleView}>Edit</button>
            </>
          )}
        </header>
        {view === "Edit" ? (
          <ArticleEditor
            setView={handleView}
            article={article}
            setLoading={setLoading}
            inputs={inputs}
            setInputs={handleSetInputs}
          />
        ) : (
          <ArticlePreview inputs={inputs} />
        )}
      </NewArticleMain>
      {showModal &&
        createPortal(
          <ConfirmModal
            title="Article"
            deleteFunction={handleDeleteArticle}
            onClose={() => setShowModal(false)}
            id={article?.id}
          />,
          document.body,
        )}
    </>
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
    z-index: 5;
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
