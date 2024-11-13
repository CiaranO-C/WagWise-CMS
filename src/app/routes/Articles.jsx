import { Outlet, useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import PageNums from "../../components/Pagination";
import Search from "../../components/Searchbar.jsx";
import ArticleGrid from "../../components/ArticleGrid";
import { Content } from "../../components/sharedStyles";
import ArticleFilters from "../../features/article-features/ArticleFilters.jsx";
import { articlesLoader } from "../router/loaders.js";
import { AuthContext } from "../../services/authProvider.jsx";
import ClipLoader from "react-spinners/ClipLoader.js";
import { getToken } from '../../api/utils.js';

function Articles() {
  const logoutUser = useOutletContext();
  const { user } = useContext(AuthContext);
  const perPage = 4;
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(false);
  const [range, setRange] = useState([0, perPage]);
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getArticles() {
      const { token, error } = await getToken(signal);
      if(error === "badTokens") return logoutUser();

      const articleData = await articlesLoader(token, signal);
      if (articleData) {
        const { published, unpublished } = articleData;
        setArticles({ published, unpublished });
        setLoading(false);
      }
    }
    if (user && loading) {
      getArticles();
    }

    return () => {
      controller.abort();
    };
  });

  const allArticles = useMemo(() => {
    if (!articles) return null;
    return [...articles.published, ...articles.unpublished];
  }, [articles]);

  if (loading)
    return (
      <ClipLoader
        color="white"
        cssOverride={{ alignSelf: "center", justifySelf: "center" }}
      />
    );

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

  function getTitle() {
    if (!filter) return "All Articles";
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
    ? articles[filter].slice(range[0], range[1])
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
        itemCount={filter ? articles[filter].length : allArticles.length}
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
