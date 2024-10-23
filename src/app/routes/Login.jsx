import { useContext, useEffect, useRef, useState } from "react";
import { login } from "../../services/authService.js";
import { AuthContext } from "../../services/authProvider.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/sharedStyles.jsx";
import Header from "../../components/Header.jsx";
import wagwiseDog from "/assets/wagwise-dog.png"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/admin/home");
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
        setUser(userLogin.user);
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
    setUsername("admin");
    setPassword("adminPass1");
    //defer submit til async state setters finished (adds to end of event queue)
    setTimeout(() => {
      if (submitRef) {
        submitRef.current.click();
      }
    }, 0);
  }
  
  if(user) return <Navigate to="/admin/home" replace/>;

  return (
    <>
      <Header />
      <LoginMain>
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
            <button ref={submitRef}>Login</button>
          </form>
          <button onClick={handleGuest}>Guest Account</button>
          <div>{errors}</div>
        </LoginContainer>
        <div className="image-container">
          <img className="dog" src={wagwiseDog} />
        </div>
      </LoginMain>
    </>
  );
}

const LoginMain = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  background-color: #8eac6c;
  padding: 0px 60px;

  .image-container {
    height: 55vh;
    min-width: 451.84px;

    .dog {
      height: 100%;
    }
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  color: black;

  h1 {
    font-size: 2rem;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    input + label {
      margin-top: 10px;
    }

    button {
      margin-top: 20px;
    }
  }

  label,
  input {
    transition: 0.3s;
  }

  label:has(+ input:focus) {
    color: white;
  }

  input {
    padding: 5px;
    background-color: #ffffff00;
    border: none;
    border-bottom: 0.75px solid;
    height: 30px;

    &:focus {
      outline: none;
      border-bottom: 1.5px solid white;
    }
  }

  button {
    ${Button}
  }
`;

export default Login;
