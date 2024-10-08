import {
  Outlet,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useMemo, useState } from "react";
import styled from "styled-components";
import PageNums from "../../components/Pagination";
import Search from "../../components/Searchbar.jsx";
import ArticleGrid from "../../components/ArticleGrid";
import { Content } from "../../components/sharedStyles";
import ArticleFilters from "../../features/article-features/ArticleFilters.jsx";

function Articles() {
  const perPage = 4;
  const location = useLocation();
  const articleData = useLoaderData();
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(false);
  const [range, setRange] = useState([0, perPage]);

  const allArticles = useMemo(() => {
    return [...articleData.published, ...articleData.unpublished];
  }, [articleData]);

  //outlet renders edit article page
  const pathArray = location.pathname.slice(1).split("/");
  if (pathArray.length > 2) return <Outlet context={pathArray[2]} />;

  //ensure filter is both new and valid
  if (validateParams()) {
    const newFilter = searchParams.get("filter");
    setFilter(newFilter);
  } else if (filter && !searchParams.size) {
    setFilter(false);
  }

  function getTitle(filterType) {
    if (!filterType) return "All Articles";
    return `${filter[0].toUpperCase() + filter.slice(1)} Articles`;
  }

  function validateParams() {
    //if previous search params are the same return false
    const search = searchParams.get("filter");
    if (filter === search) return false;
    return (
      searchParams.has("filter", "published") ||
      searchParams.has("filter", "unpublished")
    );
  }

  function handleRange(i, j) {
    setRange([i, j]);
  }

  const currentDisplay = filter
    ? articleData[filter].slice(range[0], range[1])
    : allArticles.slice(range[0], range[1]);

  return (
    <ArticlesMain>
      <PageHeader>
        <h1 className="pageTitle">{getTitle()}</h1>
        <Search className="search" />
      </PageHeader>
      <ArticleGrid articles={currentDisplay}>
        <ArticleFilters />
      </ArticleGrid>
      <PageNums
        itemsPerPage={perPage}
        itemCount={filter ? articleData[filter].length : allArticles.length}
        setItemRange={handleRange}
      />
    </ArticlesMain>
  );
}

const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    color: white;
    font-weight: 100;
    padding: 20px 0px;
  }
`;

const ArticlesMain = styled.main`
  ${Content}
  gap: 20px;
  grid-template-rows: min-content;
`;

export default Articles;
