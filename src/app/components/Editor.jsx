import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../sharedStyles";
import EditorTags from "./EditorTags";

function ArticleEditor({
  setView,
  tags,
  article,
  setLoading,
  inputs,
  setInputs,
}) {
  const editorRef = useRef(null);
  const [initialValue] = useState(inputs.body);
  const [dirty, setDirty] = useState(false);

  useEffect(() => setDirty(false), [initialValue]);
  const navigate = useNavigate();

  async function save() {
    //either update or create article
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
        title: inputs.title,
        text: content,
        tagNames: inputs.tagNames,
      }),
    });

    //if new article, navigate to its own page once saved to db
    if (method === "POST") {
      const { article: saved } = await res.json();
      navigate(`/admin/articles/${saved.id}`);
    }
  }

  function handleTitle({ target }) {
    const value = target.value;
    setInputs({ title: value });
    setDirty(true);
  }

  return (
    <Container>
      <div className="titleContainer">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={inputs.title}
          onChange={handleTitle}
          id="title"
        />
      </div>

      <StyledEditor id="editor">
        <Editor
          apiKey="7qb9ood2ye408t8d3c7ij96jsav725f3q5lxlj7m627mlci6"
          onEditorChange={(newContent) => {
            setInputs({ body: newContent });
          }}
          initialValue={initialValue}
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

      <EditorTags
        initialTags={tags}
        initialArticleTags={inputs.tagNames}
        setInputs={setInputs}
        setDirty={setDirty}
      />

      <div className="saveContainer">
        <button className="preview" onClick={setView}>
          Preview
        </button>
        <button className="save" onClick={save} disabled={!dirty}>
          Save
        </button>
        {dirty && <p className="unsaved">You have unsaved content!</p>}
      </div>
    </Container>
  );
}

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 700px 400px;
  grid-template-rows: auto 500px;
  gap: 10px;

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

  .save, .preview {
    ${Button}
    color: black;
  }

  .unsaved {
    font-size: 0.8rem;
    margin: -10px 0px;
    color: red;
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
