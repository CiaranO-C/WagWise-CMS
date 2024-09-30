import styled from "styled-components";
import Carousel from "../../components/Carousel.jsx";
import { Link } from "react-router-dom";
import { Button, Card } from "../app/sharedStyles";

function ArticlesCard({ articles }) {
  return (
    <ArticlesSection>
      <h2>Your Articles</h2>
      <Carousel articles={articles} />
      <div className="articles-links">
        <Link to="/admin/articles">All</Link>
        <Link to="/admin/articles?filter=published">Published</Link>
        <Link to="/admin/articles?filter=unpublished">Unpublished</Link>
      </div>
    </ArticlesSection>
  );
}

const ArticlesSection = styled.section`
  ${Card}
  grid-row: 3 / 5;
  grid-column: 1 / 2;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 5fr 1fr;
  column-gap: 10px;

  h2 {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    border-bottom: 0.75px solid;
    margin-bottom: 10px;
  }

  .article-carousel {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  .articles-links {
    grid-column: 1 / -1;
    grid-row: 3 / 4;

    display: flex;
    gap: 10px;
    align-items: center;

    a {
      ${Button}
      flex: 1;
    }
  }

  .current-article-links {
    grid-column: 2 / -1;
    grid-row: 2 / 3;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;

    a, button {
      ${Button}
    }
  }
`;
export default ArticlesCard;
