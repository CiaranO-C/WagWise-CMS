import DOMPurify from "dompurify";
import parse from "html-react-parser";
import styled from "styled-components";
import { Content } from "../../components/sharedStyles";

function ArticlePreview({ inputs }) {
  const { title, body, tagNames } = inputs;
  const tagCount = tagNames.length;

  function sanitize(content) {
    const sanitized = DOMPurify.sanitize(content);
    return sanitized;
  }

  return (
    <PreviewMain>
      <PreviewHeader>
        {tagNames.map((tag, i) => (
          <span className="tag" key={tag}>
            {i < tagCount - 1 ? `${tag},` : tag}
          </span>
        ))}
        <h1>{title}</h1>
      </PreviewHeader>
      <div className="divider" />
      <PreviewSection>{parse(sanitize(body))}</PreviewSection>
    </PreviewMain>
  );
}

const PreviewMain = styled.main`
  ${Content}
  color: white;
  row-gap: 20px;
  justify-items: center;

  .divider {
    border: 0.75px solid white;
    width: 25%;
    height: 0px;
  }
`;

const PreviewHeader = styled.header`
  text-align: center;
  margin: 50px 0px;

  .tag {
    color: #abd081;
    font-size: 1rem;
    margin-bottom: 15px;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 300;
  }
`;

const PreviewSection = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  h3 {
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 200;
  }

  ul,
  ol {
    display: flex;
    flex-direction: column;
    gap: 3px;
    li {
      margin-left: 25px;
    }
  }

  ol {
    background-color: #898989;
    border: 0.75px solid white;
    border-radius: 10px;
    padding: 10px 25px;
  }
`;

export default ArticlePreview;
