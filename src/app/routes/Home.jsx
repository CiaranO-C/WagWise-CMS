import { useContext, useState } from "react";
import { AuthContext } from "../../services/authProvider.jsx";
import styled from "styled-components";
import Comments from "../../features/dashboard-features/CommentsCard.jsx";
import Stats from "../../features/dashboard-features/StatsCard.jsx";
import Search from "../../components/Searchbar.jsx";
import CreateItemCard from "../../features/dashboard-features/CreateItemCard.jsx";
import TagCard from "../../features/dashboard-features/TagCard.jsx";
import { useLoaderData } from "react-router-dom";
import ArticlesCard from "../../features/dashboard-features/ArticlesCard.jsx";
import { Content } from "../../components/sharedStyles";
import DashButtons from "../../features/dashboard-features/DashButtons.jsx";

function Home() {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const [tags, setTags] = useState(data.tags);
  const { username } = user;
  console.log(user);
  

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

  @media only screen and (max-width: 980px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
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
