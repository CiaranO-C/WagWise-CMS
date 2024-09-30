import { useState } from 'react';
import styled from 'styled-components';

function NewTagForm() {
  const [tagInput, setTagInput] = useState("");
  const [displayInput, setDisplayInput] = useState(false);
  const [tagError, setTagError] = useState(null);

  function handleTagInput({ target }) {
    const value = target.value;
    setTagInput(value);
    setTagError(null);
  }

  async function handleNewTag(e) {
    try {
      e.preventDefault();
      if(!tagInput){
       return setTagError("Tag name cannot be empty");
      }
      const res = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: new URLSearchParams({
          tagName: tagInput,
        }),
      });

      console.log(res);
      const newTag = await res.json();
      window.location.reload();
      console.log(newTag);

      //if server returns error message, re-render and display
    } catch (err) {
      //setErrors(err.message);
    }
  }

  return (
    <NewTagContainer>
      <button onClick={() => setDisplayInput(!displayInput)}>New tag</button>
      <form
        className={displayInput ? "" : "hidden"}
        onSubmit={handleNewTag}
        id="newTagForm"
      >
        <input
          type="text"
          name="tagName"
          value={tagInput}
          onChange={handleTagInput}
        />
        <button onClick={() => setDisplayInput(false)} type="submit">
          +
        </button>
      </form>
      {tagError && <p>{tagError}</p>}
    </NewTagContainer>
  );
}

const NewTagContainer = styled.div`
position: relative;
display: flex;
gap: 10px;

#newTagForm {
display: flex;
transition: transform 0.5s, opacity 0.5s;
transform-origin: left;
}

#newTagForm.hidden {
transform: scaleX(0.1);
pointer-events: none;
opacity: 0;
}
`

export default NewTagForm;
