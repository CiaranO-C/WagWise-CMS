import styled from "styled-components";
import { Button } from "../../components/sharedStyles";
import { useState } from "react";
import { createPortal } from "react-dom";
import TagModal from "../../components/TagModal";
import { IoIosCloseCircleOutline } from "react-icons/io";

function EditorTags({ initialTags, initialArticleTags, setDirty, setInputs }) {
  const [select, setSelect] = useState();
  const [allTags, setAllTags] = useState(initialTags);
  const [articleTags, setArticleTags] = useState(initialArticleTags);
  const [showModal, setShowModal] = useState(false);

  function modalSetTags(newTag) {
    //adds new tag as select option and current tag
    setAllTags([...initialTags, { tagName: newTag }]);
    setArticleTags([...articleTags, newTag]);
    setInputs({ tagNames: [...articleTags, newTag] });
    setDirty(true);
  }

  function handleTags({ target }) {
    const tagName = target.value;
    if (tagName && !articleTags.includes(tagName)) {
      setArticleTags([...articleTags, tagName]);
      setInputs({ tagNames: [...articleTags, tagName] });
      setDirty(true);
    }
    setSelect(0);
  }

  function handleRemoveTag({ target }) {
    const tagName = target.value;
    setArticleTags(articleTags.filter((tag) => tag !== tagName));
    setInputs({ tagNames: articleTags.filter((tag) => tag !== tagName) });
    setDirty(true);
  }

  return (
    <>
      <TagsContainer>
        <header>
          <label htmlFor="tags">Apply Tags:</label>
          <button
            onClick={() => setShowModal(true)}
            aria-label="open create tag modal"
          >
            New tag
          </button>
          <select name="tags" id="tags" onChange={handleTags} value={select}>
            <option value="">Choose tag</option>
            {allTags.map((tag) => (
              <option key={tag.tagName} value={tag.tagName}>
                {tag.tagName}
              </option>
            ))}
          </select>
        </header>
        <p>Tags:</p>
        <div className="tags">
          {articleTags.map((tag) => (
            <button
              className="tagBtn"
              onClick={handleRemoveTag}
              key={tag}
              value={tag}
            >
              {tag}
              <IoIosCloseCircleOutline />
            </button>
          ))}
        </div>
      </TagsContainer>
      {showModal &&
        createPortal(
          <TagModal
            onClose={() => setShowModal(false)}
            setTags={modalSetTags}
          />,
          document.body,
        )}
    </>
  );
}

const TagsContainer = styled.div`
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  z-index: 1;
  height: 80%;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;

  header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 0.75px solid;
    padding-bottom: 15px;

    label {
      color: black;
      font-size: 1rem;
    }

    button {
      ${Button}
    }

    select {
      appearance: none;
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
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tagBtn {
    ${Button}
    display: flex;
    align-items: center;
    gap: 3px;
    color: black;
    text-wrap: nowrap;
    font-weight: 500;
    border-radius: 15px;
    background-color: rgb(163 191 130);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:hover {
      background-color: orange;
    }

    svg {
    pointer-events: none;
    }
  }
`;

export default EditorTags;
