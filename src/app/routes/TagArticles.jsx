import { useLoaderData, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Content } from "../../components/sharedStyles.jsx";
import ArticleGrid from "../../components/ArticleGrid";
import PageNums from "../../components/Pagination";
import { useState } from "react";

function TagArticles() {
  const articles = useLoaderData();
  const perPage = 2;
  const [range, setRange] = useState(articles.slice(0, perPage));
  const tagName = useOutletContext();

  function handleRange(i, j) {
    setRange(articles.slice(i, j));
  }

  return (
    <TagArticlesMain>
      <header>
        <h1>{tagName}</h1>
      </header>
      {articles.length ? (
        <>
          <ArticleGrid articles={range} />
          <PageNums
            itemsPerPage={perPage}
            itemCount={articles.length}
            setItemRange={handleRange}
          />
        </>
      ) : (
        <h2 className="empty-message">This tag has no articles</h2>
      )}
    </TagArticlesMain>
  );
}

const TagArticlesMain = styled.main`
  ${Content}
  grid-template-rows: 2fr 1fr 10fr;
  gap: 15px;

  header {
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    font-size: 0.5em;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid white;
    padding-bottom: 20px;
  }

  h1 {
    font-size: 4rem;
  }

  .empty-message {
    font-size: 2rem;
  }

  h1,
  .empty-message {
    color: white;
    font-weight: 100;
  }
`;

export default TagArticles;
