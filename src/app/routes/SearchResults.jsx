import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";

function SearchResults() {
  const [pageNumber, setPageNumber] = useState(1);
  const data = useLoaderData();
  const articlesPerPage = 4;
  const pages = Math.ceil(data.length / articlesPerPage);
  const indexStart = (pageNumber - 1) * articlesPerPage;
  let articles = [];
  for (let i = 0; i < articlesPerPage; i++) {
    const article = data[indexStart + i];
    articles.push(article);
  }

  //filters undefined elems from final page
  if (pageNumber === pages) articles = articles.filter((article) => article);
  function handlePrevious() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function handleNext() {
    if (pageNumber < pages) {
      setPageNumber(pageNumber + 1);
    }
  }

  return (
    <SearchMain>
      <h1>Search Results</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <Link key={article.id} to={`/admin/articles/${article.id}`}>
            <ArticleCard>
              <h3>{article.title}</h3>
              <p>{new Date(article.created).toLocaleDateString()}</p>
            </ArticleCard>
          </Link>
        </div>
      ))}
      <button
        className={pageNumber <= pages ? "disabled" : ""}
        onClick={handlePrevious}
      >
        prev
      </button>
      <button disabled>{pageNumber}</button>
      {pageNumber + 1 <= pages && (
        <button onClick={() => setPageNumber(pageNumber + 1)}>
          {pageNumber + 1}
        </button>
      )}
      {pageNumber + 2 <= pages && (
        <button onClick={() => setPageNumber(pageNumber + 2)}>
          {pageNumber + 2}
        </button>
      )}
      <button
        className={pageNumber >= pages ? "disabled" : ""}
        onClick={handleNext}
      >
        next
      </button>
    </SearchMain>
  );
}

const ArticleCard = styled.div`
  background-color: whitesmoke;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const SearchMain = styled.main`
  .disabled {
  }
`;
export default SearchResults;
