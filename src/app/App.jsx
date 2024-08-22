import { useContext, useEffect } from "react";
import "./App.css";
import { AuthContext } from "../services/authProvider";
import { Outlet, useLoaderData } from "react-router-dom";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const data = useLoaderData();

  //ensures userState not null when client has token
  useEffect(() => {
    if (!user && data) {
      setUser(data.user);
    }
  }, [user, data, setUser]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
