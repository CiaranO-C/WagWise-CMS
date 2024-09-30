import DOMPurify from "dompurify";
import parse from "html-react-parser";
import styled from "styled-components";

function ArticlePreview({ inputs }) {
  const { title, body, tagNames } = inputs;

  function sanitize(content) {
    const sanitized = DOMPurify.sanitize(content);
    return sanitized;
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <PreviewSection>
        {parse(sanitize(body))}
        {tagNames.map((tag) => (
          <p key={tag.tagName}>{tag.tagName}</p>
        ))}
      </PreviewSection>
    </>
  );
}

const PreviewSection = styled.section``;

export default ArticlePreview;
