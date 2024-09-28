import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { Content } from "../sharedStyles";
import ArticleGrid from "../components/ArticleGrid";
import PageNums from "../components/Pagination";
import { useState } from "react";

function TagArticles() {
  const articles = useLoaderData();
  const perPage = 2;
  const [range, setRange] = useState(articles.slice(0, perPage));

  function handleRange(i, j) {
    setRange(articles.slice(i, j));
  }

  return (
    <TagArticlesMain>
      <header>
        <h1>Tag articles</h1>
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
        <p>This tag has no articles</p>
      )}
    </TagArticlesMain>
  );
}

const TagArticlesMain = styled.main`
  ${Content}
  padding: 15px 65px;
  grid-template-rows: 2fr 1fr 10fr;
  gap: 15px;

  header {
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    font-size: 0.5em;
    align-items: center;
    border-bottom: 1px solid white;
    padding-bottom: 20px;
  }

  h1 {
    font-size: 6em;
    color: white;
    font-weight: 100;
  }
`;

export default TagArticles;
