import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import Search from "../components/Search";
import ArticleGrid from "../components/ArticleGrid";
import { Content } from "../sharedStyles";
import PageNums from "../components/Pagination";
import { useState } from "react";

function Articles() {
  const [range, setRange] = useState(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const articleData = useLoaderData();
  const perPage = 4;

  //outlet renders edit article page
  const pathArray = location.pathname.slice(1).split("/");
  if (pathArray.length > 2) return <Outlet context={pathArray[2]} />;

  let articles;
  let title = "All Articles";
  if (!searchParams.size) {
    //use both pub and unpub articles if no query param
    articles = [...articleData.published, ...articleData.unpublished];
  } else if (
    searchParams.has("filter", "published") ||
    searchParams.has("filter", "unpublished")
  ) {
    //valid query param, param value corresponds to loader object key
    const filter = searchParams.get("filter");
    articles = articleData[filter];
    title = `${filter[0].toUpperCase() + filter.slice(1)} Articles`;
  } else {
    return (
      <main>
        <h1>Invalid Search</h1>
        <Link to="/admin/articles/">Return to articles</Link>
      </main>
    );
  }
  if (!range) setRange(articles.slice(0, perPage));

  function handleRange(i, j) {
    setRange(articles.slice(i, j));
  }

  return (
    <ArticlesMain>
      <PageHeader>
        <h1 className="pageTitle">{title}</h1>
        <Search className="search" />
      </PageHeader>
      <ArticleGrid articles={range}>
        <div className="links">
          <NavLink
            id={
              location.pathname + location.search === "/admin/articles"
                ? "queryActive"
                : ""
            }
            to="/admin/articles"
          >
            All
          </NavLink>
          <NavLink
            id={
              location.pathname + location.search ===
              "/admin/articles?filter=published"
                ? "queryActive"
                : ""
            }
            to="/admin/articles?filter=published"
          >
            Published
          </NavLink>
          <NavLink
            id={
              location.pathname + location.search ===
              "/admin/articles?filter=unpublished"
                ? "queryActive"
                : ""
            }
            to="/admin/articles?filter=unpublished"
          >
            Unpublished
          </NavLink>
        </div>
      </ArticleGrid>
      <PageNums
        itemsPerPage={perPage}
        itemCount={articles.length}
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
    padding: 10px;
    padding: 20px 0px;
  }


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
`;

const ArticlesMain = styled.main`
  ${Content}

  a#queryActive {
    background-color: #e16923;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 1px 4px,
      rgb(51, 51, 51) 0px 0px 0px 3px;
  }

  .links {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    display: flex;
    gap: 10px;
    padding-top: 20px;
    padding-bottom: 10px;
    a {
      &:hover {
        background-color: #c4f0ee;
      }
      transition: 0.3s ease-out;
      font-weight: 400;
      color: black;
      background-color: #9ac1bf;
      padding: 10px;
      min-width: 50px;
      text-align: center;
      box-shadow:
        rgba(0, 0, 0, 0.12) 0px 1px 3px,
        rgba(0, 0, 0, 0.24) 0px 1px 2px;
    }
  }
`;

export default Articles;
