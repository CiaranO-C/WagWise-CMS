import styled from "styled-components";
import { useLoaderData, useOutletContext } from "react-router-dom";
import ArticleEditor from "../components/Editor";
import { useEffect, useState } from "react";

function EditArticle() {
  const [article, setArticle] = useState(null);
  const id = useOutletContext();
  const { tags } = useLoaderData();

  useEffect(() => {
    async function fetchArticle() {
      const res = await fetch(`/api/articles/${id}`);
      const { article } = await res.json();
      setArticle(article);
    }

    fetchArticle();
  }, [id]);

  if(!article) return null;
  
  return (
    <EditArticleMain>
      <h2>Edit article</h2>
      <ArticleEditor tags={tags} article={article} />
    </EditArticleMain>
  );
}

const EditArticleMain = styled.main`
  display: flex;
  flex-direction: column;
`;

export default EditArticle;
