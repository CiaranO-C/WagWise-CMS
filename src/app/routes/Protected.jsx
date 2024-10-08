import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/authProvider";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import { userLoader } from "../../services/authService";

function Protected() {
  const { user, setUser } = useContext(AuthContext);
  const [guard, setGuard] = useState(true);

  useEffect(() => {
    async function getUser() {
      const user = await userLoader();
      if (user) setUser(user);
      setGuard(false);
    }
    if (!user) {
      getUser();
    } else {
      setGuard(false);
    }
  }, [user, setUser]);

  if (!user && !guard) {
    return <Navigate to="/login" />;
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
