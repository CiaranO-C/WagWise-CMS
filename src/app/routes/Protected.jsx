import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/authProvider";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import { userLoader } from "../../services/authService";
import ClipLoader from 'react-spinners/ClipLoader';

function Protected() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  console.log(user);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getUser() {
      const userData = await userLoader(signal);
      console.log("USER DATA -> ", userData);

      if (userData) setUser(userData.user);
      setLoading(false);
    }
    if (!user) {
      console.log("getting user");

      getUser();
    } else {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [user, setUser]);

  if (loading) return <ClipLoader color="white" cssOverride={{ alignSelf: "center", justifySelf: "center" }} />;

  //no user or guard indicates fetch user has been attempted
  if (!user && !loading) {
    console.log("i should be navigating");
    return;

    //return <Navigate to="/" />;
  }

  return (
    <ProtectedLayout>
      <Sidebar />
      <Outlet />
    </ProtectedLayout>
  );
}

const ProtectedLayout = styled.main`
display: grid;
grid-template-columns: 200px 1fr;
min-height: 100vh;
}
`;

export default Protected;
