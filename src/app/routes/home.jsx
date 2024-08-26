import { useContext, useState } from "react";
import { AuthContext } from "../../services/authProvider.jsx";
import styled, { css } from "styled-components";
import Carousel from "../components/Carousel.jsx";
import { Link, useLoaderData } from "react-router-dom";
import { FaFolderOpen } from "react-icons/fa";

function Home() {
  const { user } = useContext(AuthContext);
  const { articles, tags } = useLoaderData();
  console.log(articles, tags);

  const { username } = user;

  return (
    <Dashboard>
      <DashHeader>
        <h1>Welcome back, {username}</h1>
      </DashHeader>
      <NewArticleCard>
        <h2>Write new article</h2>
      </NewArticleCard>
      <NewArticleCard>
        <h2>In progress</h2>
      </NewArticleCard>
      <ArticlesCard>
        <h2>Your Articles</h2>
        <Carousel articles={articles} />
        <div className="current-article-links">
          <Link>View Article</Link>
          <button>Quick unpublish</button>
        </div>
        <div className="articles-links">
        <Link to="/admin/articles">
            All <FaFolderOpen />
          </Link>
          <Link to="/admin/articles?filter=published">
            Published <FaFolderOpen />
          </Link>
          <Link to="/admin/articles?filter=unpublished">
            Unpublished <FaFolderOpen />
          </Link>
        </div>
      </ArticlesCard>
      <TagsCard>
        <h2>All tags</h2>
        <div>
          {tags.map((tag) => {
            return (
              <Link
                key={tag.tagName}
                className='tag-link'
                to={`/tags/${tag.tagName.split(" ").join("_")}`}
              >
                {tag.tagName}
              </Link>
            );
          })}
        </div>
      </TagsCard>
      <CommentsCard>
        <h2>Recent Comments</h2>
      </CommentsCard>
    </Dashboard>
  );
}

const Shared = css`
  background-color: whitesmoke;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
  padding: 15px;
`;

const Dashboard = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 15px;
`;

const DashHeader = styled.header`
  ${Shared}
  grid-row: 1 / 2;
  grid-column: 1 / -1;

  font-size: 0.5em;
`;

const NewArticleCard = styled.section`
  ${Shared}
`;

const InProgressCard = styled.section`
  ${Shared}
`;

const CommentsCard = styled.section`
  ${Shared}
`;

const TagsCard = styled.section`
  ${Shared}
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;

  h2 {
    grid-row: 1 / 2;
  }

  div {
    grid-row: 2 / -1;
  }

  .tag-link {
    background-color: orange;
    padding: 7px;
    border-radius: 1px;
    color: black;
  }
`;

const ArticlesCard = styled.section`
  ${Shared}
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 5fr 1fr;

  h2 {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
  }

  .article-carousel {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  .articles-links {
    grid-column: 1 / -1;
    grid-row: 3 / 4;

    display: flex;
    flex-direction: column;
  }

  .current-article-links {
    grid-column: 2 / -1;
    grid-row: 2 / 3;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;

    a {
      text-align: center;
    }
  }
`;

export default Home;
