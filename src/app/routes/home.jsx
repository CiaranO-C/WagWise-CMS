import { useContext } from "react";
import { AuthContext } from "../../services/authProvider";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Home page!</h1>
    </>
  );
}

export default Home;
