import "./App.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../services/authProvider";
import { Outlet, useLoaderData } from "react-router-dom";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const userData = useLoaderData();

  //ensures userState not null when client has token
  useEffect(() => {
    if (!user && userData) {
      setUser(userData.user);
    }
  }, [user, userData, setUser]);

  //guards from login page flash inbetween page reload and useEffect
  if(!user && userData) return;

  return (
    <>    
      <Outlet />
    </>
  );
}

export default App;
