import { useState } from "react";
import { Link, useLoaderData, useMatches } from "react-router-dom";
import styled from "styled-components";

function Tags() {
  const { tags } = useLoaderData();
  const [tagInput, setTagInput] = useState("");
  const [displayInput, setDisplayInput] = useState(false);
  const [tagError, setTagError] = useState(null);
  const match = useMatches();
  console.log(match);

  function handleTagInput({ target }) {
    const value = target.value;
    setTagInput(value);
  }

  async function handleNewTag(e) {
    try {
      e.preventDefault();
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
      console.log(newTag);

      //if server returns error message, re-render and display
    } catch (err) {
      //setErrors(err.message);
    }
  }

  return (
    <TagsMain>
      <h1>All Tags</h1>
      <div className='newTagContainer'>
        <button onClick={()=>setDisplayInput(!displayInput)}>New tag</button>
        <form className={displayInput ? "" : "hidden"} onSubmit={handleNewTag} id='newTagForm'>
          <input
            type="text"
            name="tagName"
            value={tagInput}
            onChange={handleTagInput}
          />
          <button onClick={()=>setDisplayInput(true)} type="submit">+</button>
        </form>
      </div>
      <ul>
        {tags.map((tag) => (
          <li key={tag.tagName}>
            <Link to={`/admin/articles/${tag.tagName.split(" ").join("_")}`}>
              <p>{tag.tagName}</p>
              <p>{tag._count.articles}</p>
            </Link>
          </li>
        ))}
      </ul>
    </TagsMain>
  );
}

const TagsMain = styled.main`
display: flex;
flex-direction: column;

.newTagContainer {
position: relative;
display: flex;
gap: 10px;
}

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
`;
export default Tags;
