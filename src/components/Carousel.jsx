import { useState } from "react";
import styled from "styled-components";
import { PiArrowCircleRightThin, PiArrowCircleLeftThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { togglePublish } from "../api/api-article";

function Carousel({ articles }) {
  const { published, unpublished } = articles;
  const [index, setIndex] = useState(0);
  const [mostRecent, setMostRecent] = useState(
    published.length ? "published" : "unpublished",
  );
  const navigate = useNavigate();
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

  function toggleCurrent() {
    const selection = mostRecent === "published" ? "unpublished" : "published";
    setMostRecent(selection);
  }

  async function handlePublish({ target }) {
    try {
      const toggled = await togglePublish(article.id, target.id);

      if (toggled) {
        if (current.length === 1) toggleCurrent();
        //navigate to current url to revalidate loader
        navigate(".", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <CarouselWrapper>
        <div className="selectWrapper">
          <label htmlFor="recent">Display</label>
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
        </div>
        <CarouselDiv>
          <CarouselButton onClick={scrollPrevious}>
            <PiArrowCircleLeftThin />
          </CarouselButton>
          <Frame>
            <h4>{article.title}</h4>
            <div className="article-info">
              <h5>Created</h5>
              <p>{createdAt}</p>
            </div>
          </Frame>
          <CarouselButton onClick={scrollNext}>
            <PiArrowCircleRightThin />
          </CarouselButton>
        </CarouselDiv>
      </CarouselWrapper>
      <div className="current-article-links">
        <Link to={`/admin/articles/${article.id}`}>View Article</Link>
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

const CarouselWrapper = styled.div`
  .selectWrapper {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .current-article-links button {
    text-align: center;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    min-width: 70%;
    padding: 8px;
    border-radius: 5px;
    border: none;
    background-color: whitesmoke;
    cursor: pointer;
    transition: 0.3s ease-out;
    &:hover {
      background-color: white;
    }
  }
  select {
    appearance: none;
    width: 150px;
    background-color: whitesmoke;
    border: 0;
    outline: 0;
    font: inherit;
    border-radius: 5px;
    padding: 5px;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    cursor: pointer;

    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7rem top 50%;
    background-size: 0.65rem auto;

    &::-ms-expand {
      display: none;
    }

    &:focus {
      outline: none;
    }
  }
`;

const CarouselDiv = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  gap: 10px;
  align-items: center;
`;

const Frame = styled.div`
  flex: 1;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background-color: #e6e6e6;
  border-radius: 15px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  overflow-y: scroll;

  h4 {
    font-size: 1.2rem;
    font-weight: 400;
    height: 100%;
    border-bottom: 1px solid black;
  }

  p {
    font-style: italic;
    font-size: 0.8rem;
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
    color: #519500;
    cursor: pointer;
  }
`;
export default Carousel;
