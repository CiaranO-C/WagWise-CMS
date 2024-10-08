import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ArticleEdit from "../../features/article-features/ArticleEdit.jsx";

function NewArticle() {
  const [loading, setLoading] = useState(true);
  const tags = useLoaderData();

  return (
    <ArticleEdit
      loading={loading}
      setLoading={() => setLoading(false)}
      tags={tags}
      article={null}
    />
  );
}

export default NewArticle;
