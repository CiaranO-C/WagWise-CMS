import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/authProvider.jsx";
import styled from "styled-components";
import Comments from "../../features/dashboard-features/CommentsCard.jsx";
import Stats from "../../features/dashboard-features/StatsCard.jsx";
import Search from "../../components/Searchbar.jsx";
import CreateItemCard from "../../features/dashboard-features/CreateItemCard.jsx";
import TagCard from "../../features/dashboard-features/TagCard.jsx";
import ArticlesCard from "../../features/dashboard-features/ArticlesCard.jsx";
import { Content } from "../../components/sharedStyles.jsx";
import DashButtons from "../../features/dashboard-features/DashButtons.jsx";
import { dashboardLoader } from "../router/loaders.js";
import ClipLoader from 'react-spinners/ClipLoader.js';
import { useOutletContext } from 'react-router-dom';
import { getToken } from '../../api/utils.js';

function Home() {
  const logoutUser = useOutletContext();
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState(null);
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(true);

  const { username } = user;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getRouteData() {
      const { token, error } = await getToken(signal);
      if(error === "badTokens") return logoutUser();

      const homeData = await dashboardLoader(token, signal);
      if (homeData) {
        console.log("homeData fine", homeData);
        
        setArticles(homeData.articles);
        setTags(homeData.tags);
        setLoading(false);
      }
    }
    if (user && loading) {
      getRouteData();
    }

    return () => {
      controller.abort();
    };
  }, [user, loading, logoutUser]);

  if (loading) return <ClipLoader color="white" cssOverride={{ alignSelf: "center", justifySelf: "center" }} />;

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
      <ArticlesCard articles={articles} />
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
