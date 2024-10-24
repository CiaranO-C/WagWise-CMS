import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { Content } from "../../components/sharedStyles.jsx";
import ArticleGrid from "../../components/ArticleGrid";
import PageNums from "../../components/Pagination";
import { useEffect, useState } from "react";
import { taggedArticles } from "../router/loaders.js";
import ClipLoader from "react-spinners/ClipLoader.js";
import { getToken } from '../../api/utils.js';

function TagArticles() {
  const logoutUser = useOutletContext();
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useParams();
  const perPage = 2;
  const [range, setRange] = useState([0, perPage]);
  const tagName = useOutletContext();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getArticles() {
      const { token, error } = await getToken(signal);
      if(error === "badTokens") return logoutUser();

      const articleData = await taggedArticles(searchParams, signal, token);
      if (articleData) {
        setArticles(articleData);
        setLoading(false);
      }
    }

    if (!articles && loading) {
      getArticles();
    }

    return () => {
      controller.abort();
    };
  }, [searchParams, articles, loading]);

  if (loading)
    return (
      <ClipLoader
        color="white"
        cssOverride={{ alignSelf: "center", justifySelf: "center" }}
      />
    );

  function handleRange(i, j) {
    setRange([i, j]);
  }

  return (
    <TagArticlesMain>
      <header>
        <h1>{tagName}</h1>
      </header>
      {articles.length ? (
        <>
          <ArticleGrid articles={articles.slice(range[0], range[1])} />
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
