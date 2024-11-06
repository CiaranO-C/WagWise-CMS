import { useEffect, useRef, useState } from "react";
import { handleNewTag } from "../api/api-tag";
import styled from "styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  Button,
  FadeOut,
  GrowFromMiddle,
  ShrinkToMiddle,
} from "./sharedStyles";

function TagModal({ onClose, setTags }) {
  const [success, setSuccess] = useState(false);
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
      setSuccess(true);
      setTags(tagName);
      //delay closing modal to display success message
      setTimeout(() => {
        onClose();
      }, 2100);
    }
  }

  return (
    <DivModal className={success ? "fade" : ""}>
      <div className={success ? "formContainer close" : "formContainer"}>
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
          {!success && <button type="submit">Create tag</button>}
        </form>
        {success && <p className="success">Tag Created!</p>}
        {tagError && !success && <p>{tagError}</p>}
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
  z-index: 10;
  will-change: opacity, transform;

  &.fade {
    ${FadeOut};
    animation: FadeOut 0.1s 2s forwards;
  }

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
    will-change: opacity, transform;

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

  .success {
    opacity: 0;
    ${GrowFromMiddle};
    animation: GrowFromMiddle 0.3s ease-out forwards;
  }

  .close {
    ${ShrinkToMiddle};
    animation: ShrinkToMiddle 0.3s ease-out 1.7s forwards;
  }
`;

export default TagModal;
