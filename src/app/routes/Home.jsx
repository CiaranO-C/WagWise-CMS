import { useContext, useState } from "react";
import { AuthContext } from "../../services/authProvider.jsx";
import styled from "styled-components";
import Comments from "../components/CommentsCard.jsx";
import Stats from "../components/Stats.jsx";
import Search from "../components/Search.jsx";
import CreateItemCard from "../components/CreateItemCard.jsx";
import TagCard from "../components/TagCard.jsx";
import { useLoaderData } from "react-router-dom";
import ArticlesCard from "../components/ArticlesCard.jsx";
import { Content } from "../sharedStyles.jsx";
import DashButtons from "../components/DashButtons.jsx";

function Home() {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const [tags, setTags] = useState(data.tags);
  const { username } = user;

  function handleSetTags(newTag) {
    setTags([...tags, { tagName: newTag, new: true }]);
  }

  return (
    <Dashboard>
      <DashHeader>
        <h1>Welcome back, {username}</h1>
        <Search />
      </DashHeader>
      <CreateItemCard setTags={handleSetTags} />
      <TagCard tags={tags} />
      <ArticlesCard articles={data.articles} />
      <Comments />
      <Stats />
      <DashButtons />
    </Dashboard>
  );
}

const Dashboard = styled.main`
  ${Content}
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 80px 80px 260px;
  gap: 15px;
`;

const DashHeader = styled.header`
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  font-size: 0.5em;
  align-items: center;
  border-bottom: 1px solid white;

  h1 {
    font-size: 6em;
    color: white;
    font-weight: 100;
  }
`;

export default Home;
