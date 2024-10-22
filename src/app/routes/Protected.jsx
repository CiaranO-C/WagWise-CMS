import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/authProvider";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import { userLoader } from "../../services/authService";

function Protected() {
  const { user, setUser } = useContext(AuthContext);
  const [guard, setGuard] = useState(true);
console.log(user);

  useEffect(() => {
    async function getUser() {
      const user = await userLoader();
      if (user) setUser(user.user);
      setGuard(false);
    }
    if (!user) {
      console.log("getting user");
      
      getUser();
    } else {
      setGuard(false);
    }
  }, [user, setUser]);

  /*
  useEffect(() => {
    async function getUser() {
      const user = await userLoader();
      if (user) setUser(user.user);
    }
    if (!user && getToken()) {
      getUser();
    }
  }, [user, setUser]);
  */

  if (!user && !guard) {
    return <Navigate to="/" />;
  }

  if (guard) return;

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
