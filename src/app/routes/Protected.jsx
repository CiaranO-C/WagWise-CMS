import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/authProvider";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import { logout, userLoader } from "../../services/authService";
import ClipLoader from "react-spinners/ClipLoader";

function Protected() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const navigate = useNavigate();

  function logoutUser() {
    //remove any tokens
    logout();
    navigate("/");
    setUser(null);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getUser() {
      const userData = await userLoader(signal);
      if (userData) setUser(userData.user);
      setLoading(false);
    }
    if (!user) {
      getUser();
    } else {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [user, setUser]);

  useEffect(() => {
    const isProtected =
      location.pathname.split("/").filter((p) => p)[0] === "admin";
    //user and loading falsy indicates fetch user has been attempted
    if (isProtected && !user && !loading) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, loading, navigate, user]);

  if (loading)
    return (
      <ClipLoader
        color="white"
        cssOverride={{ alignSelf: "center", justifySelf: "center" }}
      />
    );

  if (!user && !loading) {
    return;
  }

  return (
    <ProtectedLayout>
      <Sidebar />
      <Outlet context={logoutUser} />
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
