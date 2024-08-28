import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useLoaderData } from "react-router-dom";

function NewArticle() {
  const { tags } = useLoaderData();

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [select, setSelect] = useState();
  const [articleTags, setArticleTags] = useState([]);
  const [initialValue, setInitialValue] = useState("New Article...");
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), [initialValue]);

  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setDirty(false);
      editorRef.current.setDirty(false);
      // an application would save the editor content to the server here
      console.log(content);
    }
  };

  function handleTitle({ target }) {
    const value = target.value;
    setTitle(value);
  }

  function handleTags({ target }) {
    const tagName = target.value;
    if (tagName && !articleTags.includes(tagName)) {
      setArticleTags([...articleTags, tagName]);
      setSelect(0);
    }
  }

  function handleRemoveTag({ target }) {
    const tagName = target.value;
    setArticleTags(articleTags.filter((tag) => tag !== tagName));
  }

  return (
    <NewArticleMain>
      <h2>Write new article</h2>
      <label htmlFor="title">Article Title:</label>
      <input type="text" value={title} onChange={handleTitle} id="title" />
      <label htmlFor="tags">Apply Tags:</label>
      <select name="tags" id="tags" onChange={handleTags} value={select}>
        <option value="">--Please choose tags--</option>
        {tags.map((tag) => (
          <option key={tag.tagName} value={tag.tagName}>
            {tag.tagName}
          </option>
        ))}
      </select>
      <p>Tags:</p>
      <div>
        {articleTags.map((tag) => (
          <button onClick={handleRemoveTag} key={tag} value={tag}>
            {tag} x
          </button>
        ))}
      </div>
      <StyledEditor id="editor">
        <Editor
          apiKey="7qb9ood2ye408t8d3c7ij96jsav725f3q5lxlj7m627mlci6"
          initialValue={initialValue}
          onInit={(evt, editor) => (editorRef.current = editor)}
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
      <button onClick={save} disabled={!dirty}>
        Save
      </button>
      {dirty && <p>You have unsaved content!</p>}
    </NewArticleMain>
  );
}

const NewArticleMain = styled.main`
  display: flex;
  flex-direction: column;
`;

const StyledEditor = styled.div`
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

export default NewArticle;
