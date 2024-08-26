import {
  Link,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

function Articles() {
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  const articleData = useLoaderData();
  const previewLength = 60;
  let articles;
  let title = "All Articles";
  if (!searchParams.size) {
    //use both pub and unpub articles if no query param
    articles = [...articleData.published, ...articleData.unpublished];
  } else if (
    searchParams.has("filter", "published") ||
    searchParams.has("filter", "unpublished")
  ) {
    //valid params match loader data key names
    const filter = searchParams.get("filter");
    articles = articleData[filter];
    title = `${filter[0].toUpperCase() + filter.slice(1)} Articles`;
  } else {
    return (
      <main>
        <h1>Invalid search</h1>
        <Link to="/admin/articles/">Return to articles</Link>
      </main>
    );
  }

  return (
    <ArticlesMain>
      <h1>{title}</h1>
      <ArticleGrid>
        {articles.map((article) => (
          <Link key={article.id} to={`/admin/article/${article.id}`}>
            <ArticleCard >
              <h3>{article.title}</h3>
              <p>{`${article.body.slice(0, previewLength)}...`}</p>
            </ArticleCard>
          </Link>
        ))}
      </ArticleGrid>
    </ArticlesMain>
  );
}

const ArticlesMain = styled.main`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const ArticleGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 15px;
`;

const ArticleCard = styled.div`
  background-color: whitesmoke;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
  width: 100%;
  height: 100%;
  padding: 15px;
`;

export default Articles;
