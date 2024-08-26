import { useContext } from "react";
import { AuthContext } from "../../services/authProvider";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from '../components/Sidebar';

function Protected() {
  const { user } = useContext(AuthContext);
  
  if (!user) return <Navigate to="/login" />;

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
`;

export default Protected;
