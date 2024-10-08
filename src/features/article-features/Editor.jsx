import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import EditorTags from "./EditorTags";
import { Button } from "../../components/sharedStyles";
import { createArticle, updateArticle } from "../../api/api-article";

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
    const articleData = {
      title: inputs.title,
      text: editorRef.current.getContent(),
      tagNames: inputs.tagNames,
    };

    if (article) {
      const updated = await updateArticle(article.id, articleData);
    } else {
      const newArticle = await createArticle(articleData);     
      //if new article, navigate to its edit page
      navigate(`/admin/articles/${newArticle.id}`);
    }

    setDirty(false);
    editorRef.current.setDirty(false);
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

  .save,
  .preview {
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
