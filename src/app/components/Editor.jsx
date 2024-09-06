import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../sharedStyles";
import { createPortal } from "react-dom";
import TagModal from "./TagModal";

function ArticleEditor({ tags, article, setLoading }) {
  const [showModal, setShowModal] = useState(false);
  const [allTags, setAllTags] = useState(tags);
  const editorRef = useRef(null);
  const [title, setTitle] = useState(article ? article.title : "");
  const [select, setSelect] = useState();
  const [articleTags, setArticleTags] = useState(
    article ? article.tags.map((tag) => tag.tagName) : [],
  );
  const [initialValue] = useState("New Article...");
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), [initialValue]);
  const navigate = useNavigate();

  function handleSetTags(newTag) {
    setAllTags([...tags, { tagName: newTag }]);
    setArticleTags([...articleTags, newTag]);
  }

  async function save() {
    if (editorRef.current) {
      const method = article ? "PUT" : "POST";
      const path = article ? `/api/articles/${article.id}` : "/api/articles";
      const content = editorRef.current.getContent();
      setDirty(false);
      editorRef.current.setDirty(false);

      const res = await fetch(path, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          title,
          text: content,
          tagNames: articleTags,
        }),
      });
      const { article: saved } = await res.json();
      navigate(`/admin/articles/${saved.id}`);
    }
  }

  function handleTitle({ target }) {
    const value = target.value;
    setTitle(value);
    setDirty(true);
  }

  function handleTags({ target }) {
    const tagName = target.value;
    if (tagName && !articleTags.includes(tagName)) {
      setArticleTags([...articleTags, tagName]);
      setDirty(true);
    }
    setSelect(0);
  }

  function handleRemoveTag({ target }) {
    const tagName = target.value;
    setArticleTags(articleTags.filter((tag) => tag !== tagName));
    setDirty(true);
  }

  return (
    <>
      <Container>
        <div className="titleContainer">
          <label htmlFor="title">Title:</label>
          <input type="text" value={title} onChange={handleTitle} id="title" />
        </div>

        <StyledEditor id="editor">
          <Editor
            apiKey="7qb9ood2ye408t8d3c7ij96jsav725f3q5lxlj7m627mlci6"
            initialValue={article ? article.body : "New content..."}
            onInit={(evt, editor) => {
              editorRef.current = editor;
              setLoading();
            }}
            onDirty={() => setDirty(true)}
            init={{
              width: 700,
              height: 500,
              menubar: "edit view insert format tools table help",
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
            }}
          />
        </StyledEditor>

        <div className="tagsContainer">
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
                {tag} x
              </button>
            ))}
          </div>
        </div>

        <div className="saveContainer">
          {dirty && <p>You have unsaved content!</p>}
          <button className="save" onClick={save} disabled={!dirty}>
            Save
          </button>
        </div>
      </Container>
      {showModal &&
        createPortal(
          <TagModal
            onClose={() => setShowModal(false)}
            setTags={handleSetTags}
          />,
          document.body,
        )}
    </>
  );
}

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 700px 400px;
  grid-template-rows: auto 500px;
  gap: 10px;

  .overlay {
    position: absolute;
    z-index: 5;
    width: 100%;
    height: 100%;
    background-color: #575757;
  }

  .titleContainer {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: white;
    padding: 15px;
    border-radius: 10px;

    label,
    input {
      font-size: 1.3rem;
    }

    input {
      border: none;
      border-bottom: 0.75px solid;
      flex: 1;
      outline: none;

      &:focus {
        border-bottom: 1.75px solid orange;
      }
    }
  }

  .tagsContainer {
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
      color: black;
      text-wrap: nowrap;
      font-weight: 500;
      border-radius: 15px;
      background-color: #ff7e31;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

      &:hover {
        background-color: orange;
      }
    }
  }

  .saveContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-end;
    height: 100%;
    background-color: white;
    z-index: 0;
    padding: 15px;
    border-radius: 10px;
    grid-row: 1 / 3;
    grid-column: 2 / 3;
  }

  .save {
    ${Button}
    color: black;
  }
`;

const StyledEditor = styled.div`
  grid-row: 2 / 3;
  align-self: end;

  &#editor .tox-tinymce {
    border: none;
  }
  &#editor textarea: {
    resize: none;
  }
  &#editor .tox-statusbar__branding > a,
  &#editor .tox-statusbar__resize-handle svg {
    display: none;
  }
`;

export default ArticleEditor;
