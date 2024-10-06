import { useLoaderData, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleEdit from "../../features/article-features/ArticleEdit.jsx";
import { fetchArticle } from "../../api/api-article.js";

function EditArticle() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const id = useOutletContext();
  const { tags } = useLoaderData();

  useEffect(() => {
    async function handleFetchArticle() {
      const fetchedArticle = await fetchArticle(id);
      setArticle(fetchedArticle);
    }
    handleFetchArticle();
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
