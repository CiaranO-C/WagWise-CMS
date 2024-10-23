import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleEdit from "../../features/article-features/ArticleEdit.jsx";
import { fetchArticle } from "../../api/api-article.js";
import ClipLoader from 'react-spinners/ClipLoader.js';

function EditArticle() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const id = useOutletContext();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function handleFetchArticle() {
      const fetchedArticle = await fetchArticle(id, signal);
      setArticle(fetchedArticle);
    }
    handleFetchArticle();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (!article) return <ClipLoader color="white" cssOverride={{ alignSelf: "center", justifySelf: "center" }} />;

  return (
    <ArticleEdit
      loading={loading}
      setLoading={() => setLoading(false)}
      article={article}
    />
  );
}

export default EditArticle;
