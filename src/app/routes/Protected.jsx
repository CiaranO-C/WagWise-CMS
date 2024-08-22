import { useContext } from 'react';
import { AuthContext } from '../../services/authProvider';
import { Navigate, Outlet } from 'react-router-dom';

function Protected() {
   const {user} = useContext(AuthContext);
   
  return (
    user ? <Outlet/> : <Navigate to="/login" />
  )
}

export default Protected;
