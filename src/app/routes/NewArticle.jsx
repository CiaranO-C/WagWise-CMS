import { useState } from "react";
import ArticleEdit from "../../features/article-features/ArticleEdit.jsx";

function NewArticle() {
  const [loading, setLoading] = useState(true);

  return (
    <ArticleEdit
      loading={loading}
      setLoading={() => setLoading(false)}
      article={null}
    />
  );
}

export default NewArticle;
