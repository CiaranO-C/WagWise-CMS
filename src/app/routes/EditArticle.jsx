import { useLoaderData, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleEdit from "../components/ArticleEdit";

function EditArticle() {
  const [loading, setLoading] = useState(true);
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

  if (!article) return null;

  return (
    <ArticleEdit
      loading={loading}
      setLoading={() => setLoading(false)}
      tags={tags}
      article={article}
    />
  );
}

export default EditArticle;
