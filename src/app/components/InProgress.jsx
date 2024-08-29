import styled from "styled-components";
import { Shared } from "../sharedStyles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function InProgress() {
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLastUpdated() {
      const res = await fetch(
        "/api/articles/admin/unpublished?sort=updated&limit=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      console.log(res);
      const resJson = await res.json();
      console.log(resJson);

      setArticle(resJson.articles[0]);
      setLoading(false);
      console.log(resJson);
    }
    fetchLastUpdated();
  }, []);

  if (loading) return <h1>Loading!</h1>;

  return (
    <Link to={`/admin/articles/${article.id}`}>
      <InProgressCard>
        <h2>In Progress</h2>
        <p>{article.title}</p>
        <p>Last updated: {new Date(article.updated).toLocaleDateString()}</p>
      </InProgressCard>
    </Link>
  );
}

const InProgressCard = styled.section`
  ${Shared}
`;

export default InProgress;
