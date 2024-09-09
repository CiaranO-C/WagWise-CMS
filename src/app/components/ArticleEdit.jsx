import { CircleSpinner } from "react-spinners-kit";
import { Content } from "../sharedStyles";
import ArticleEditor from "./Editor";
import styled from "styled-components";

function ArticleEdit({ loading, setLoading, tags, article }) {
  return (
    <NewArticleMain>
      {loading && (
        <div className="overlay">
          <CircleSpinner />
        </div>
      )}
      <h1>{ article ? "Edit article" : "New article" }</h1>
      <ArticleEditor
        tags={tags}
        article={article || null}
        setLoading={setLoading}
      />
    </NewArticleMain>
  );
}

const NewArticleMain = styled.main`
  ${Content}
  position: relative;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
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

  h1 {
    width: 100%;
    max-width: 1110px;
    border-bottom: 1px solid white;
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    font-size: 3.5rem;
    color: white;
    font-weight: 100;
  }
`;

export default ArticleEdit;
