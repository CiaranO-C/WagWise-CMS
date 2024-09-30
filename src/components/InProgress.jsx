import styled from "styled-components";
import { Card } from "../app/sharedStyles";
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
      const resJson = await res.json();
      setArticle(resJson.articles[0]);
      setLoading(false);
    }
    fetchLastUpdated();
  }, []);

  if (loading) return <h1>Loading!</h1>;

  return (
    <InProgressCard>
      <Link to={`/admin/articles/${article.id}`}>
        <h2>In Progress</h2>
        <p>{article.title}</p>
        <p>Last updated: {new Date(article.updated).toLocaleDateString()}</p>
      </Link>
    </InProgressCard>
  );
}

const InProgressCard = styled.section`
  ${Card}
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 5px;

  h2 {
    width: 100%;
    border-bottom: 0.75px solid black;
  }

  h2 + p {
    flex: 1;
  }

  p + p {
    font-size: 0.8rem;
    font-style: italic;
  }
`;

export default InProgress;
