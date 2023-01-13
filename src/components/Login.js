import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = (props) => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [stateError, setStateError] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="login">
        <h3 className="title">Login</h3>
        <form
          className="login-form"
          onSubmit={async (e) => {
            if (!usernameLogin || !passwordLogin) {
              e.preventDefault();
              const errorMessage = "Please enter valid username and password";
              setStateError(errorMessage);
            } else {
              try {
                e.preventDefault();
                const response = await loginUser(usernameLogin, passwordLogin);
                localStorage.setItem("token", response.token);
                props.setToken(response.token);
                navigate("/");
              } catch (error) {
                console.error(error);
              }
            }
          }}
        >
          <input
            value={usernameLogin}
            type="text"
            placeholder="username"
            minLength={3}
            onChange={(e) => setUsernameLogin(e.target.value)}
          ></input>
          <input
            value={passwordLogin}
            type="password"
            placeholder="password"
            minLength={8}
            onChange={(e) => setPasswordLogin(e.target.value)}
          ></input>
          <button type="submit">Login</button>
          <Link to="/register">Don't have an account? Register Here</Link>
          {stateError ? <h3>{stateError}</h3> : ""}
        </form>
      </div>
    </>
  );
};

export default Login;
