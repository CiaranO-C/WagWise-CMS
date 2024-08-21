import { useState } from "react";
import { login } from "../../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();

  async function handleLogin(e) {
    try {
      e.preventDefault();
      const userLogin = await login(username, password);
      //if server returns error message, re-render and display
      if (userLogin.error) {
        setErrors(userLogin.error);
      }
    } catch (err) {
      setErrors("Unexpected login error, please try again");
    }
  }

  function handleChange({ target }) {
    if (target.id === "username") {
      setUsername(target.value);
    } else {
      setPassword(target.value);
    }
  }

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleChange}
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
        <div>{errors}</div>
      </div>
    </>
  );
}

export default Login;
