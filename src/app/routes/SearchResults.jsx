import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ArticleGrid from "../components/ArticleGrid";
import Search from "../components/Search";
import PageNums from "../components/Pagination.jsx";
import { Content, Header } from "../sharedStyles";

function SearchResults() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(null);
  const perPage = 2;

  useEffect(() => {
    async function searchResultsLoader() {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`/api/articles/admin/search${location.search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { articles } = await res.json();
      setResults(articles);
      setRange(articles.slice(0, perPage));
      setLoading(false);
    }
    searchResultsLoader();
  }, [location.search]);

  if (loading) return <h1>Loading</h1>;

  function handleRange(i, j) {
    setRange(results.slice(i, j));
  }

  return (
    <SearchMain>
      <header>
        <h1>Search Results</h1>
        <Search />
      </header>
      <ArticleGrid articles={range} />
      <PageNums
        itemsPerPage={perPage}
        itemCount={results.length}
        setItemRange={handleRange}
      />
    </SearchMain>
  );
}

const SearchMain = styled.main`
  ${Content}
  grid-template-rows: 100px 425px 1fr;
  row-gap: 20px;

  header {
    ${Header}
  }
`;
export default SearchResults;
