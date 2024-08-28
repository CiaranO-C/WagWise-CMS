import { useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function Carousel({ articles }) {
  const { published, unpublished } = articles;
  const [index, setIndex] = useState(0);
  const [mostRecent, setMostRecent] = useState(
    published.length ? "published" : "unpublished",
  );

  const current = mostRecent === "published" ? published : unpublished;

  const length = current.length;
  const article = current[index];
  const createdAt = new Date(article.created).toLocaleString();

  function updateMostRecent({ target }) {
    const selection = target.value;
    setMostRecent(selection);
    setIndex(0);
  }

  function scrollNext() {
    //scroll to start if next exceeds length
    const next = index + 1 > length - 1 ? 0 : index + 1;
    setIndex(next);
  }

  function scrollPrevious() {
    //scroll to end if previous less than 0
    const previous = index - 1 < 0 ? length - 1 : index - 1;
    setIndex(previous);
  }

  async function handlePublish({ target }) {
    try {
      const { id: buttonType } = target;
      await fetch(`/api/articles/${article.id}/${buttonType}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      //force reload to reset articles card
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="article-carousel">
        <label htmlFor="recent">Show recent:</label>
        <select
          name="recent"
          id="recent"
          value={mostRecent}
          onChange={updateMostRecent}
        >
          {published.length && <option value="published">Published</option>}
          {unpublished.length && (
            <option value="unpublished">Unpublished</option>
          )}
        </select>
        <CarouselDiv>
          <CarouselButton onClick={scrollPrevious}>
            <MdOutlineArrowLeft />
          </CarouselButton>
          <Frame>
            <h4>{article.title}</h4>
            <div className="article-info">
              <h5>Created</h5>
              <p>{createdAt}</p>
            </div>
          </Frame>
          <CarouselButton onClick={scrollNext}>
            <MdOutlineArrowRight />
          </CarouselButton>
        </CarouselDiv>
      </div>
      <div className="current-article-links">
        <Link to={`/admin/article/${article.id}`}>View Article</Link>
        {mostRecent === "published" ? (
          <button onClick={handlePublish} id="unpublish">
            Quick unpublish
          </button>
        ) : (
          <button onClick={handlePublish} id="publish">
            Quick publish
          </button>
        )}
      </div>
    </>
  );
}

const CarouselDiv = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 200px;

  .article-info {
  }
`;

const Frame = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;

  h4 {
    font-size: 1.2em;
    height: 100%;
    border-bottom: 1px solid black;
  }
`;

const CarouselButton = styled.button`
  display: flex;
  place-content: center;
  border: none;
  background-color: rgb(255, 255, 255, 0);
  outline: none;

  svg {
    width: 30px;
    height: 30px;
  }

  svg:hover {
    color: rgb(225, 105, 34);
  }
`;
export default Carousel;
