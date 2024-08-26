import { useContext, useEffect, useRef, useState } from "react";
import { login } from "../../services/authService.js";
import { AuthContext } from "../../services/authProvider.jsx";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const usernameRef = useRef(null);

  useEffect(() => {
    if(usernameRef.current){
        usernameRef.current.focus()
    }
  }, [loading]);

  useEffect(() => {
    if (user) {
      navigate("/admin/home");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  async function handleLogin(e) {
    try {
      e.preventDefault();
      const userLogin = await login(username, password);
      //if server returns error message, re-render and display
      if (userLogin?.error) {
        return setErrors(userLogin.error);
      } else {
        navigate("/admin/home");
        console.log("cya!");
        return setUser(userLogin.user);
      }
    } catch (err) {
      setErrors(err.message);
    }
  }

  function handleChange({ target }) {
    if (target.id === "username") {
      setUsername(target.value);
    } else {
      setPassword(target.value);
    }
  }

  function handleGuest() {
    setUsername("Admin");
    setPassword("adminPass1");
  }

  //prevent log-in screen flashing if user already logged in
  if (loading) return;

  return (
    <main>
      <LoginContainer>
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleChange}
            ref={usernameRef}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
        <button onClick={handleGuest}>Guest Account</button>
        <div>{errors}</div>
      </LoginContainer>
    </main>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 70px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  gap: 10px;

  h1 {
    font-size: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default Login;
