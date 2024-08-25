import { useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";

function Carousel({ articles }) {
  const [index, setIndex] = useState(0);
  const [mostRecent, setMostRecent] = useState("published");
  const { publishedArticles, unpublishedArticles } = articles;
  const current =
    mostRecent === "published" ? publishedArticles : unpublishedArticles;

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

  return (
    <>
      <label htmlFor="recent">Show recent:</label>
      <select
        name="recent"
        id="recent"
        value={mostRecent}
        onChange={updateMostRecent}
      >
        <option value="published">Published</option>
        <option value="unpublished">Unpublished</option>
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
    </>
  );
}

const CarouselDiv = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
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
