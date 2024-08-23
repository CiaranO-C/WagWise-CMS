import { Link } from "react-router-dom";
import { AuthContext } from "../../services/authProvider";
import { useContext } from "react";
import { logout } from '../../services/authService';

function Header() {
  const { user } = useContext(AuthContext);

  function handleLogout(){
    logout();
    //call logout function
    //must remove token
    //must remove user state
    //must redirect to login page, as pages are outlets below, forcing a reload after removing
    //the above should therefore automatically redirect to the login page
  }
  return (
    <header>
      <h3>wag wise</h3>
      {user && (
        <div className="links">
          <button onClick={handleLogout}>Logout</button> 
        </div>
      )}
    </header>
  );
}

export default Header;
