import { useEffect, useRef, useState } from "react";
import { handleNewTag } from "../../utils/tag";
import styled from "styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button } from "../sharedStyles";

function TagModal({ onClose, setTags }) {
  const [tagName, setTagName] = useState("");
  const [tagError, setTagError] = useState(null);
  const tagNameRef = useRef(null);

  useEffect(() => {
    if (tagNameRef.current) {
      tagNameRef.current.focus();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const submit = await handleNewTag(tagName, setTagError);

    if (submit === true) {
      setTags(tagName);
      onClose();
      return;
    }
  }

  return (
    <DivModal>
      <div className="formContainer">
        <h2>Create New Tag</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="tagName">Tag Name</label>
          <input
            ref={tagNameRef}
            type="text"
            name="tagName"
            id="tagName"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
          <button type="submit">Create tag</button>
        </form>
        {tagError && <p>{tagError}</p>}
        <button id="closeModal" onClick={onClose}>
          <IoIosCloseCircleOutline />
        </button>
      </div>
    </DivModal>
  );
}

const DivModal = styled.div`
  display: flex;
  background-color: #ababab36;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100vw;
  height: 100vh;

  .formContainer {
    z-index: 10;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px 30px;
    gap: 15px;
    align-items: center;
    justify-content: space-evenly;
    box-shadow:
      rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;

    h2 {
      font-weight: 300;
    }

    form {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-template-rows: auto;
      align-items: center;
      gap: 15px;
    }

    form input {
      background-color: #bbbbbb00;
      border: 1px solid;
      border-radius: 10px;
      padding: 6px;
      font-size: 1em;
    }

    form button {
      grid-column: 1 / -1;
      ${Button}
      min-width: 70%;
    }
  }

  #closeModal {
    cursor: pointer;
    background-color: white;
    border: none;
    position: absolute;
    top: 5px;
    right: 5px;

    svg {
      width: 25px;
      height: 25px;
    }
    &:hover {
      color: orange;
    }
  }
`;

export default TagModal;
