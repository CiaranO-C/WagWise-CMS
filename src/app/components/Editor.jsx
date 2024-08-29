import { useEffect, useRef, useState } from "react";
import NewTagForm from "./NewTagForm";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";

function ArticleEditor({ tags, article }) {
    console.log(article);
    
  const editorRef = useRef(null);
  const [title, setTitle] = useState(article ? article.title : "");
  const [select, setSelect] = useState();
  const [articleTags, setArticleTags] = useState(article ? article.tags.map(tag => tag.tagName) : []);
  const [initialValue, setInitialValue] = useState("New Article...");
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), [initialValue]);
  const navigate = useNavigate();

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
      setSelect(0);
    }
  }

  function handleRemoveTag({ target }) {
    const tagName = target.value;
    setArticleTags(articleTags.filter((tag) => tag !== tagName));
    setDirty(true);
  }

  return (
    <>
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
      <NewTagForm />
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
          initialValue={article ? article.body : "New content..."}
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
    </>
  );
}

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

export default ArticleEditor;
